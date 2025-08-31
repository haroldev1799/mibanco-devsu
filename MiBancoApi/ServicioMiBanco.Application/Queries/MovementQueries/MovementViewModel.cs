namespace ServicioMiBanco.Application.Queries.MovementQueries
{
    public class MovementViewModel
    {
        public long id { get; set; }
        public long client_id { get; set; }
        public string person { get; set; }
        public string account_number { get; set; }
        public decimal current_balance { get; set; }
        public decimal daily_limit_amount { get; set; }
        public decimal initial_balance { get; set; }
        public decimal amount { get; set; }
        public DateTime date { get; set; }
        public string transaction_type { get; set; }
    }
}
