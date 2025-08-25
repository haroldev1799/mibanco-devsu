using MediatR;
using ServicioMiBanco.Domain.AggregatesModel.MovementAggregate;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;
using ServicioMiBanco.Domain.Core.Exceptions;

namespace ServicioMiBanco.Application.Commands.MovementCommand
{
    public class DeleteMovementCommandHandler : IRequestHandler<DeleteMovementCommand, bool>
    {
        private readonly IMovementRepository _movementRepository;


        public DeleteMovementCommandHandler(IMovementRepository movementRepository)
        {
            _movementRepository = movementRepository ?? throw new ArgumentNullException(nameof(movementRepository));
        }

        public async Task<bool> Handle(DeleteMovementCommand request, CancellationToken cancellationToken)
        {
            var movement = await _movementRepository.GetAsync(request.id);
            if (movement == null)
                throw new ServicioMiBancoDomainException("No existe el movimiento.");

            await _movementRepository.Remove(movement);

            return await _movementRepository.UnitOfWork.SaveEntitiesAsync();
        }
    }
}
