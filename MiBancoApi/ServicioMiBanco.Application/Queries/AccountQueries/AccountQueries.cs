using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ServicioMiBanco.Application.Queries.AccountQueries
{
    public class AccountQueries : IAccountQueries
    {
        private string _connectionString = string.Empty;
        public AccountQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));

        }

        public async Task<IEnumerable<AccountViewModel>> GetAll()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var param = new DynamicParameters();
                var result = await connection.QueryAsync<AccountViewModel>(@"[dbo].[ACCOUNT_GET_ALL]", param, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<AccountViewModel> GetById(long id)
        {

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var param = new DynamicParameters();
                param.Add("@AccountNumberId", id, DbType.Int64);
                var result = await connection.QueryFirstAsync<AccountViewModel>(@"[dbo].[ACCOUNT_GET_BY_ID]", param, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
    }
}
