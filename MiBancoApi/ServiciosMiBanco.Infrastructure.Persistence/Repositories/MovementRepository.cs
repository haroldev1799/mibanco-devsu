using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.AggregatesModel.MovementAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiciosMiBanco.Infrastructure.Persistence.Repositories
{
    public class MovementRepository : IMovementRepository
    {
        private readonly ServiciosMiBancoContext _context;

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return _context;
            }
        }

        public MovementRepository(ServiciosMiBancoContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Movement> Add(Movement movement)
        {
            return (await _context.Movement.AddAsync(movement)).Entity;
        }
        public async Task<Movement> Update(Movement movement)
        {
            return _context.Movement
                        .Update(movement)
                        .Entity;
        }
        public async Task Remove(Movement movement)
        {
            await Task.Run(() => _context.Movement.Remove(movement));
        }
        public async Task<Movement> GetAsync(long movementId)
        {
            var movement = await _context.Movement.FindAsync(movementId);
            return movement;
        }
    }
}
