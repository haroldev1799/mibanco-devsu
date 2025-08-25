using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ServicioMiBanco.Application.Queries.MovementQueries
{
    public class MovementQueries: IMovementQueries
    {
        private string _connectionString = string.Empty;
        public MovementQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));

        }

        public async Task<IEnumerable<MovementViewModel>> GetAll()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var param = new DynamicParameters();
                var result = await connection.QueryAsync<MovementViewModel>(@"[dbo].[MOVEMENT_GET_ALL]", param, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<MovementViewModel> GetById(long id)
        {

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var param = new DynamicParameters();
                param.Add("@MovementId", id, DbType.Int64);
                var result = await connection.QueryFirstAsync<MovementViewModel>(@"[dbo].[MOVEMENT_GET_BY_ID]", param, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<IEnumerable<MovementViewModel>> GetByAccountAndDateAsync(long id)
        {

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var param = new DynamicParameters();
                param.Add("@AccountId", id, DbType.Int64);
                param.Add("@Date", DateTime.Today, DbType.Date);
                var result = await connection.QueryAsync<MovementViewModel>(@"[dbo].[MOVEMENT_GET_MOVEMENTS_BY_ACCOUNT_DATE]", param, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

    }
}
