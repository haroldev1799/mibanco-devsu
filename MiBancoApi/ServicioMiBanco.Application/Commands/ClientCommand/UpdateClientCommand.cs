using MediatR;
using System.Runtime.Serialization;

namespace ServicioMiBanco.Application.Commands.ClientCommand
{
    [DataContract]
    public class UpdateClientCommand : IRequest<bool>
    {
        //person
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string gender { get; set; }
        [DataMember]
        public int age { get; set; }
        [DataMember]
        public string identification { get; set; }
        [DataMember]
        public string address { get; set; }
        [DataMember]
        public string phone { get; set; }
        //client
        [DataMember]
        public long id { get; set; }
        [DataMember]
        public string password { get; set; }
        [DataMember]
        public bool status { get; set; }
    }
}
