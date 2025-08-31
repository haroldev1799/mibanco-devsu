using MediatR;
using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;

namespace ServicioMiBanco.Application.Commands.AccountCommand
{
    public class UpdateAccountCommandHandler : IRequestHandler<UpdateAccountCommand, bool>
    {
        private readonly IAccountRepository _accountRepository;

        public UpdateAccountCommandHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository ?? throw new ArgumentNullException(nameof(accountRepository));
        }

        public async Task<bool> Handle(UpdateAccountCommand request, CancellationToken cancellationToken)
        {
            var account = await _accountRepository.GetAsync(request.id);
            account.update(request.account_number, request.type, request.daily_limit_amount, request.status, request.client_id);
            await _accountRepository.Update(account);
            return await _accountRepository.UnitOfWork.SaveEntitiesAsync();
        }
    }
}
