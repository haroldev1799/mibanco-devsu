using MediatR;
using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;

namespace ServicioMiBanco.Application.Commands.AccountCommand
{
    public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, bool>
    {
        private readonly IAccountRepository _accountRepository;

        public CreateAccountCommandHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository ?? throw new ArgumentNullException(nameof(accountRepository));
        }

        public async Task<bool> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
        {
            var account = new Account(request.account_number, request.type, request.initial_balance, request.initial_balance, request.daily_limit_amount, request.status, request.client_id);
            await _accountRepository.Add(account);
            return await _accountRepository.UnitOfWork.SaveEntitiesAsync();
        }
    }
}
