using MediatR;
using System.Runtime.Serialization;

namespace ServicioMiBanco.Application.Commands.AccountCommand
{
    [DataContract]
    public class DeleteAccountCommand : IRequest<bool>
    {
        [DataMember]
        public long id { get; set; }
    }
}
