using Azure.Core;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;

namespace ServiciosMiBanco.Infrastructure.Persistence.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly ServiciosMiBancoContext _context;

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return _context;
            }
        }

        public PersonRepository(ServiciosMiBancoContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Person> Add(Person person)
        {
            return (await _context.Person.AddAsync(person)).Entity;
        }
        public async Task<Person> Update(Person person)
        {
            return _context.Person
                        .Update(person)
                        .Entity;
        }
        public async Task Remove(Person person)
        {
            await Task.Run(() => _context.Person.Remove(person));
        }
        public async Task<Person> GetAsync(long personId)
        {
            var person = await _context.Person.FindAsync(personId);
            return person;
        }
    }
}
