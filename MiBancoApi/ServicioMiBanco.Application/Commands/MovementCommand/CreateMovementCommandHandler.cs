using MediatR;
using ServicioMiBanco.Application.Queries.MovementQueries;
using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;
using ServicioMiBanco.Domain.AggregatesModel.MovementAggregate;
using ServicioMiBanco.Domain.Core.Exceptions;


namespace ServicioMiBanco.Application.Commands.MovementCommand
{
    public class CreateMovementCommandHandler : IRequestHandler<CreateMovementCommand, bool>
    {
        private readonly IMovementRepository _movementRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IMovementQueries _movementQueries;


        public CreateMovementCommandHandler(IMovementRepository movementRepository, IAccountRepository accountRepository, IMovementQueries movementQueries)
        {
            _movementRepository = movementRepository ?? throw new ArgumentNullException(nameof(movementRepository));
            _accountRepository = accountRepository ?? throw new ArgumentNullException(nameof(accountRepository));
            _movementQueries = movementQueries ?? throw new ArgumentNullException(nameof(movementQueries));
        }

        public async Task<bool> Handle(CreateMovementCommand request, CancellationToken cancellationToken)
        {
            // 1. Obtener cuenta
            var account = await _accountRepository.GetAsync(request.account_id);
            if (account == null)
                throw new ServicioMiBancoDomainException("La cuenta no existe.");

            // 2. Calcular retiros hechos hoy
            var today = DateTime.UtcNow.Date;
            var todaysMovements = await _movementQueries.GetByAccountAndDateAsync(request.account_id);

            decimal todaysWithdrawals = todaysMovements
                .Where(m => m.amount < 0) // solo egresos
                .Sum(m => Math.Abs(m.amount)); // sumamos valor absoluto de egresos

            // 3. Si es egreso, validar límite
            if (request.amount < 0)
            {
                var newTotal = todaysWithdrawals + Math.Abs(request.amount);

                if (newTotal > account.daily_limit_amount)
                {
                    throw new ServicioMiBancoDomainException(
                        $"Se excedió el límite diario: {account.daily_limit_amount}"
                    );
                }
            }

            // 4. Calcular balance
            var newBalance = account.current_balance + request.amount;
            if (newBalance < 0)
                throw new ServicioMiBancoDomainException("Saldo insuficiente.");

            // 5. Crear movimiento
            var movement = new Movement(
                new DateTime(),
                request.transaction_type,
                request.amount,
                newBalance,
                request.account_id
            );

            // 6. Actualizar balance de cuenta
            account.UpdateCurrentBalance(newBalance);


            await _accountRepository.Update(account);

            await _movementRepository.Add(movement);

            return await _movementRepository.UnitOfWork.SaveEntitiesAsync();
        }
    }
}
