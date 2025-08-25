using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;
using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiciosMiBanco.Infrastructure.Persistence.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly ServiciosMiBancoContext _context;

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return _context;
            }
        }

        public ClientRepository(ServiciosMiBancoContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Client> Add(Client client)
        {
            return (await _context.Client.AddAsync(client)).Entity;
        }
        public async Task<Client> Update(Client client)
        {
            return _context.Client
                        .Update(client)
                        .Entity;
        }
        public async Task Remove(Client client)
        {
            await Task.Run(() => _context.Client.Remove(client));
        }
        public async Task<Client> GetAsync(long clientId)
        {
            var client = await _context.Client.FindAsync(clientId);
            return client;
        }
    }
}
