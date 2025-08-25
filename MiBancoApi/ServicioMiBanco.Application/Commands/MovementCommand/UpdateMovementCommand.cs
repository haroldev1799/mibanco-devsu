using MediatR;
using System.Runtime.Serialization;

namespace ServicioMiBanco.Application.Commands.MovementCommand
{
    [DataContract]
    public class UpdateMovementCommand : IRequest<bool>
    {
        [DataMember]
        public long id { get; set; }
        [DataMember]
        public DateTime date { get; set; }
        [DataMember]
        public string transaction_type { get; set; }
        [DataMember]
        public decimal amount { get; set; }
        [DataMember]
        public decimal balance { get; set; }
        [DataMember]
        public long account_id { get; set; }
    }
}
