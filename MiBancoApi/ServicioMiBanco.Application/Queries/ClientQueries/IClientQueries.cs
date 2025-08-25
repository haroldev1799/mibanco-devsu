namespace ServicioMiBanco.Application.Queries.ClientQueries
{
    public interface IClientQueries
    {
        Task<IEnumerable<ClientViewModel>> GetAll();
        Task<ClientViewModel> GetById(long id);
    }
}
