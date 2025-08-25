using MediatR;
using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;
using ServicioMiBanco.Domain.Core.Exceptions;

namespace ServicioMiBanco.Application.Commands.ClientCommand
{
    public class DeleteClientCommandHandler : IRequestHandler<DeleteClientCommand, bool>
    {
        private readonly IClientRepository _clientRepository;
        private readonly IPersonRepository _personRepository;


        public DeleteClientCommandHandler(IClientRepository clientRepository, IPersonRepository personRepository)
        {
            _clientRepository = clientRepository ?? throw new ArgumentNullException(nameof(clientRepository));
            _personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
        }

        public async Task<bool> Handle(DeleteClientCommand request, CancellationToken cancellationToken)
        {
            var client = await _clientRepository.GetAsync(request.id);
            if (client == null)
                throw new ServicioMiBancoDomainException("Client does not exist.");

            // Eliminar el cliente primero
            await _clientRepository.Remove(client);

            // Luego eliminar la persona asociada
            var person = await _personRepository.GetAsync(client.person_id);
            if (person != null)
                await _personRepository.Remove(person);

            // Guardar cambios en una sola transacción
            return await _clientRepository.UnitOfWork.SaveEntitiesAsync();
        }
    }
}
