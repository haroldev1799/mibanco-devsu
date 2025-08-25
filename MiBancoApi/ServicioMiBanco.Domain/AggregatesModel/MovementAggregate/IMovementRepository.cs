using ServicioMiBanco.Domain.Core.SeedWork;

namespace ServicioMiBanco.Domain.AggregatesModel.MovementAggregate
{
    public interface IMovementRepository : IRepository<Movement>
    {
        Task<Movement> Add(Movement movement);
        Task<Movement> Update(Movement movement);
        Task<Movement> GetAsync(long movementId);
        Task Remove(Movement movement);
    }
}
