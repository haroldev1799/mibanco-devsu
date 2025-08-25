namespace ServicioMiBanco.Application.Queries.MovementQueries
{
    public class MovementViewModel
    {
        public long id { get; set; }
        public DateTime? date { get; set; }
        public string? transaction_type { get; set; }
        public decimal amount { get; set; }
        public decimal balance { get; set; }
        public long account_id { get; set; }
    }
}
