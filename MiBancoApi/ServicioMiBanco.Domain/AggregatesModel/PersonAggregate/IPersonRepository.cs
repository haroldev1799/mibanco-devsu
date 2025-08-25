using ServicioMiBanco.Domain.AggregatesModel.MovementAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;
namespace ServicioMiBanco.Domain.AggregatesModel.PersonAggregate
{
    public interface IPersonRepository : IRepository<Person>
    {
        Task<Person> Add(Person person);
        Task<Person> Update(Person person);
        Task<Person> GetAsync(long personId);
        Task Remove(Person person);
    }
}
