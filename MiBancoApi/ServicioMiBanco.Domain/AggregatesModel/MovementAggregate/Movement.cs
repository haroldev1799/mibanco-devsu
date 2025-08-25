using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;


namespace ServicioMiBanco.Domain.AggregatesModel.MovementAggregate
{
    public class Movement : Entity, IAggregateRoot
    {
        public DateTime date { get; private set; }
        public string transaction_type { get; private set; }
        public decimal amount { get; private set; }
        public decimal balance { get; private set; }
        public long account_id { get; private set; }
        
        public Account account { get; private set; }

        protected Movement() { }

        public Movement(DateTime date, string transaction_type, decimal amount, decimal balance, long account_id, long id = 0)
        {
            this.date = date;
            this.transaction_type = transaction_type;
            this.amount = amount;
            this.balance = balance;
            this.account_id = account_id;
            if(id > 0)
            {
                Id = id;
            }
        }

        public void update(DateTime date, string transaction_type, decimal amount, decimal balance, long account_id, long id)
        {
            this.date = date;
            this.transaction_type = transaction_type;
            this.amount = amount;
            this.balance = balance;
            this.account_id = account_id;
            Id = id;
        }
    }
}
