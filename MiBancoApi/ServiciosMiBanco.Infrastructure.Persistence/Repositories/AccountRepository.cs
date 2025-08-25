using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;


namespace ServiciosMiBanco.Infrastructure.Persistence.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ServiciosMiBancoContext _context;

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return _context;
            }
        }

        public AccountRepository(ServiciosMiBancoContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Account> Add(Account account)
        {
            return (await _context.Account.AddAsync(account)).Entity;
        }
        public async Task<Account> Update(Account account)
        {
            return _context.Account
                        .Update(account)
                        .Entity;
        }
        public async Task Remove(Account account)
        {
            await Task.Run(() => _context.Account.Remove(account));
        }
        public async Task<Account> GetAsync(long accountId)
        {
            var account = await _context.Account.FindAsync(accountId);
            return account;
        }
    }
}
