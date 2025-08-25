using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioMiBanco.Domain.AggregatesModel.ClientAggregate
{
    public class Client : Entity, IAggregateRoot
    {
        public long person_id { get; private set; }
        public string password { get; private set; }
        public bool status { get; private set; }

        // Relación con Persona
        public Person Person { get; private set; }

        // Relación 1-N con Cuenta
        public List<Account> Accounts { get; private set; }

        protected Client()
        {
            Accounts = new List<Account>();
        }

        public Client(long person_id, string password, bool status, long id = 0)
        {
            this.person_id = person_id;
            this.password = password;
            this.status = status;
            if(id > 0)
            {
                Id = id;
            }
            Accounts = new List<Account>();
        }

        public void update(long person_id, string password, bool status, long id)
        {
            this.person_id = person_id;
            this.password = password;
            this.status = status;
            this.Id = id;
        }
    }
}
