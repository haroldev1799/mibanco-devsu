namespace ServicioMiBanco.Application.Queries.ReportQueries
{
    public class ReportViewModel
    {
        public long client_id { get; set; }
        public string client { get; set; }
        public string account { get; set; }
        public long account_id { get; set; }
        public decimal current_balance { get; set; }
        public decimal daily_limit_amount { get; set; }
        public decimal initial_balance { get; set; }
        public long amount { get; set; }
        public DateTime? date { get; set; }
        public string? transaction_type { get; set; }
        public decimal balance { get; set; }
    }
}
