using MediatR;
using ServicioMiBanco.Application.Queries.MovementQueries;
using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;
using ServicioMiBanco.Domain.AggregatesModel.MovementAggregate;
using ServicioMiBanco.Domain.Core.Exceptions;


namespace ServicioMiBanco.Application.Commands.MovementCommand
{
    public class UpdateMovementCommandHandler : IRequestHandler<UpdateMovementCommand, bool>
    {
        private readonly IMovementRepository _movementRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IMovementQueries _movementQueries;

        public UpdateMovementCommandHandler(
            IMovementRepository movementRepository,
            IAccountRepository accountRepository,
            IMovementQueries movementQueries)
        {
            _movementRepository = movementRepository ?? throw new ArgumentNullException(nameof(movementRepository));
            _accountRepository = accountRepository ?? throw new ArgumentNullException(nameof(accountRepository));
            _movementQueries = movementQueries ?? throw new ArgumentNullException(nameof(movementQueries));
        }

        public async Task<bool> Handle(UpdateMovementCommand request, CancellationToken cancellationToken)
        {
            // 1. Obtener cuenta
            var account = await _accountRepository.GetAsync(request.account_id);
            if (account == null)
                throw new ServicioMiBancoDomainException("La cuenta no existe.");

            // 2. Obtener movimiento actual
            var movement = await _movementRepository.GetAsync(request.id);
            if (movement == null)
                throw new ServicioMiBancoDomainException("El movimiento no existe.");

            // 3. Calcular retiros hechos hoy (excluyendo este movimiento actual para recalcular correctamente)
            var today = DateTime.UtcNow.Date;
            var todaysMovements = await _movementQueries.GetByAccountAndDateAsync(request.account_id);

            decimal todaysWithdrawals = todaysMovements
                .Where(m => m.id != request.id && m.amount < 0) // excluir este movimiento
                .Sum(m => Math.Abs(m.amount));

            // 4. Validar límite si es egreso
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

            // 5. Actualizar movimiento
            movement.update(
                request.date,
                request.transaction_type,
                request.amount,
                request.balance,
                request.account_id,
                request.id
            );

            await _movementRepository.Update(movement);

            return await _movementRepository.UnitOfWork.SaveEntitiesAsync();
        }
    }
}
