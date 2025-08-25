using MediatR;
using System.Runtime.Serialization;

namespace ServicioMiBanco.Application.Commands.AccountCommand
{
    [DataContract]
    public class UpdateAccountCommand : IRequest<bool>
    {
        [DataMember]
        public long id { get; set; }
        [DataMember]
        public long account_number { get; set; }
        [DataMember]
        public string type { get; set; }
        [DataMember]
        public decimal initial_balance { get; set; }
        [DataMember]
        public decimal current_balance { get; set; }
        [DataMember]
        public decimal daily_limit_amount { get; set; }
        [DataMember]
        public bool status { get; set; }
        [DataMember]
        public long client_id { get; set; }
    }
}
