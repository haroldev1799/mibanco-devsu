namespace ServicioMiBanco.Application.Queries.AccountQueries
{
    public interface IAccountQueries
    {
        Task<IEnumerable<AccountViewModel>> GetAll();
        Task<AccountViewModel> GetById(long id);
    }
}
