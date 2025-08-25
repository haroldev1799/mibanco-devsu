using ServicioMiBanco.Domain.Core.SeedWork;

namespace ServicioMiBanco.Domain.AggregatesModel.ClientAggregate
{
    public interface IClientRepository : IRepository<Client>
    {
        Task<Client> Add(Client client);
        Task<Client> Update(Client client);
        Task<Client> GetAsync(long clientId);
        Task Remove(Client client);
    }
}
