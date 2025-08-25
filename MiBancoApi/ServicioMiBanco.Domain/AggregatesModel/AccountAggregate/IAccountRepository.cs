using ServicioMiBanco.Domain.Core.SeedWork;

namespace ServicioMiBanco.Domain.AggregatesModel.AccountAggregate
{
    public interface IAccountRepository : IRepository<Account>
    {
        Task<Account> Add(Account account);
        Task<Account> Update(Account account);
        Task<Account> GetAsync(long accountId);
        Task Remove(Account account);
    }
}
