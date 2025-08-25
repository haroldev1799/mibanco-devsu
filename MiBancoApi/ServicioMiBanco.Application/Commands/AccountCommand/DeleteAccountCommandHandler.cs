using MediatR;
using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;
using ServicioMiBanco.Domain.Core.Exceptions;

namespace ServicioMiBanco.Application.Commands.AccountCommand
{
    public class DeleteAccountCommandHandler : IRequestHandler<DeleteAccountCommand, bool>
    {
        private readonly IAccountRepository _accountRepository;


        public DeleteAccountCommandHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository ?? throw new ArgumentNullException(nameof(accountRepository));
        }

        public async Task<bool> Handle(DeleteAccountCommand request, CancellationToken cancellationToken)
        {
            var account = await _accountRepository.GetAsync(request.id);
            if (account == null)
                throw new ServicioMiBancoDomainException("No existe la cuenta.");

            await _accountRepository.Remove(account);

            return await _accountRepository.UnitOfWork.SaveEntitiesAsync();
        }
    }
}
