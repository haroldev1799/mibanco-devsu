using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ServicioMiBanco.Application.Queries.ClientQueries
{
    public class ClientQueries : IClientQueries
    {
        private string _connectionString = string.Empty;
        public ClientQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));
        }

        public async Task<IEnumerable<ClientViewModel>> GetAll()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var param = new DynamicParameters();
                var result = await connection.QueryAsync<ClientViewModel>(@"[dbo].[CLIENT_GET_ALL]", param, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<ClientViewModel> GetById(long id)
        {

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var param = new DynamicParameters();
                param.Add("@ClienteId", id, DbType.Int64);
                var result = await connection.QueryFirstAsync<ClientViewModel>(@"[dbo].[CLIENT_GET_BY_ID]", param, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
    }
}
