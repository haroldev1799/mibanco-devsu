using MediatR;
using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;


namespace ServicioMiBanco.Application.Commands.ClientCommand
{
    public class UpdateAccountCommandHandler : IRequestHandler<UpdateClientCommand, bool>
    {
        private readonly IClientRepository _clientRepository;
        private readonly IPersonRepository _personRepository;

        public UpdateAccountCommandHandler(IClientRepository clientRepository, IPersonRepository personRepository)
        {
            _clientRepository = clientRepository ?? throw new ArgumentNullException(nameof(clientRepository));
            _personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
        }

        public async Task<bool> Handle(UpdateClientCommand request, CancellationToken cancellationToken)
        {
            // 1. Buscar el cliente existente
            var client = await _clientRepository.GetAsync(request.id);
            if (client == null)
                throw new Exception($"Client with Id {request.id} not found");

            // 2. Buscar la persona asociada
            var person = await _personRepository.GetAsync(client.person_id);
            if (person == null)
                throw new Exception($"Person with Id {client.person_id} not found");

            // 3. Actualizar datos de persona
            person.update(
                request.name,
                request.gender,
                request.age,
                request.identification,
                request.address,
                request.phone,
                person.Id
            );
            await _personRepository.Update(person);

            // 4. Actualizar datos de cliente
            client.update(person.Id, request.password, request.status, request.id);
            await _clientRepository.Update(client);

            // 5. Guardar cambios en UnitOfWork (transacción única)
            return await _clientRepository.UnitOfWork.SaveEntitiesAsync();
        }
    }
}
