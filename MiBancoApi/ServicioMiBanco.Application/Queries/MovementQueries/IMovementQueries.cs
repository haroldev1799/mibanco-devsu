namespace ServicioMiBanco.Application.Queries.MovementQueries
{
    public interface IMovementQueries
    {
        Task<IEnumerable<MovementViewModel>> GetAll();
        Task<MovementViewModel> GetById(long id);
        Task<IEnumerable<MovementViewModel>> GetByAccountAndDateAsync(long id);
    }
}
