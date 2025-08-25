using MediatR;
using System.Runtime.Serialization;

namespace ServicioMiBanco.Application.Commands.MovementCommand
{
    [DataContract]
    public class DeleteMovementCommand : IRequest<bool>
    {
        [DataMember]
        public long id { get; set; }
    }
}
