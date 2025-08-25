namespace ServicioMiBanco.Application.Queries.AccountQueries
{
    public class AccountViewModel
    {
        public long id { get; set; }
        public long account_number { get; set; }
        public string? type { get; set; }
        public decimal initial_balance { get; set; }
        public bool status { get; set; }
        public long client_id { get; set; }

    }
}
