using MediatR;
using System.Runtime.Serialization;

namespace ServicioMiBanco.Application.Commands.MovementCommand
{
    [DataContract]
    public class CreateMovementCommand : IRequest<bool>
    {
        [DataMember]
        public string transaction_type { get; set; }
        [DataMember]
        public decimal amount { get; set; }
        [DataMember]
        public long account_id { get; set; }
    }
}
