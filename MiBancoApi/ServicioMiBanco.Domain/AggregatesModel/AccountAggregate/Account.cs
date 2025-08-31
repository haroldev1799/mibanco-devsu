using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.AggregatesModel.MovementAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;

namespace ServicioMiBanco.Domain.AggregatesModel.AccountAggregate
{
    public class Account : Entity, IAggregateRoot
    {
        public long account_number { get; private set; }
        public string type { get; private set; }
        public decimal initial_balance { get; private set; }
        public decimal current_balance { get; private set; }
        public decimal daily_limit_amount { get; private set; }
        public bool status { get; private set; }
        public long client_id { get; private set; }
        public Client Client { get; private set; }

        // Relación 1-N con Movimientos
        public List<Movement> Movements { get; private set; }

        protected Account()
        {
            Movements = new List<Movement>();
        }

        public Account(long account_number, string type, decimal initial_balance, decimal current_balance, decimal daily_limit_amount, bool status, long client_id, long? id = 0)
        {
            this.account_number = account_number;
            this.type = type;
            this.initial_balance = initial_balance;
            this.current_balance = current_balance;
            this.daily_limit_amount = daily_limit_amount;
            this.status = status;
            this.client_id = client_id;
            if(id > 0)
            {
                Id = id.Value;
            }
            Movements = new List<Movement>();
        }

        public void update(long account_number, string type, decimal daily_limit_amount, bool status, long client_id)
        {
            this.account_number = account_number;
            this.type = type;
            this.daily_limit_amount = daily_limit_amount;
            this.status = status;
            this.client_id = client_id;
            Movements = new List<Movement>();
        }

        public void UpdateCurrentBalance(decimal current_balance)
        {
            this.current_balance = current_balance;
        }
    }
}
