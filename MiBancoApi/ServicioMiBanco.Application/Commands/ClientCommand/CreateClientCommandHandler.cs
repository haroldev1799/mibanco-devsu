using Azure;
using MediatR;
using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;
using System.Net;
using System.Numerics;
using System.Reflection;

namespace ServicioMiBanco.Application.Commands.ClientCommand
{
    public class CreateClientCommandHandler : IRequestHandler<CreateClientCommand, bool>
    {
        private readonly IClientRepository _clientRepository;
        private readonly IPersonRepository _personRepository;


        public CreateClientCommandHandler(IClientRepository clientRepository, IPersonRepository personRepository)
        {
            _clientRepository = clientRepository ?? throw new ArgumentNullException(nameof(clientRepository));
            _personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
        }

        public async Task<bool> Handle(CreateClientCommand request, CancellationToken cancellationToken)
        {
            // 1. Crear persona
            var person = new Person(
                request.name,
                request.gender,
                request.age,
                request.identification,
                request.address,
                request.phone
            );

            await _personRepository.Add(person);
            await _personRepository.UnitOfWork.SaveEntitiesAsync();

            // 2. Crear cliente asociado a la persona recién insertada
            var client = new Client(person.Id, request.password, request.status);

            await _clientRepository.Add(client);
            return await _clientRepository.UnitOfWork.SaveEntitiesAsync();
        }
    }
}
