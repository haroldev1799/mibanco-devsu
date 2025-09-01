
namespace ServicioMiBanco.Application.Queries.ReportQueries
{
    public interface IReportQueries
    {
        Task<IEnumerable<ReportViewModel>> GetAll(long? clientId, long? accountId, DateTime? date, long? movementId);
    }
}
