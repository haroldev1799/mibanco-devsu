using Dapper;
using Microsoft.Data.SqlClient;
using ServicioMiBanco.Application.Queries.MovementQueries;
using System.Data;

namespace ServicioMiBanco.Application.Queries.ReportQueries
{
    public class ReportQueries : IReportQueries
    {
        private string _connectionString = string.Empty;
        public ReportQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));

        }

        public async Task<IEnumerable<ReportViewModel>> GetAll(long clientId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var param = new DynamicParameters();
                param.Add("@ClienteId", clientId, DbType.Int64);
                var result = await connection.QueryAsync<ReportViewModel>(@"[dbo].[REPORT_GET]", param, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

    }
}
