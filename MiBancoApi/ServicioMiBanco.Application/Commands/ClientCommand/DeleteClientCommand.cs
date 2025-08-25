using MediatR;
using System.Runtime.Serialization;

namespace ServicioMiBanco.Application.Commands.ClientCommand
{
    [DataContract]
    public class DeleteClientCommand : IRequest<bool>
    {
        [DataMember]
        public long id { get; set; }
    }
}
