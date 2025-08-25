namespace ServicioMiBanco.Application.Queries.ClientQueries
{
    public class ClientViewModel
    {
        //client
        public long id { get; set; }
        public string? password { get; set; }
        public bool status { get; set; }
        public long person_id { get; set; }
        //person
        public string? name { get; set; }
        public string? gender { get; set; }
        public int age { get; set; }
        public string? identification { get; set; }
        public string? address { get; set; }
        public string? phone { get; set; }
    }
}
