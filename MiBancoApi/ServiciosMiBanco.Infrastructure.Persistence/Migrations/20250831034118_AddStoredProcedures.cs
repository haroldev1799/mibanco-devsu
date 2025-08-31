using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiciosMiBanco.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddStoredProcedures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[GET_ALL_PERSON]
                AS
                BEGIN
                    SELECT * FROM dbo.person
                END
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[PERSON_GET_BY_ID]
                @PersonId BIGINT
                AS
                BEGIN
                    SELECT * FROM dbo.person WHERE ID = @PersonId
                END
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[ACCOUNT_GET_ALL]
                AS
                BEGIN
                    SELECT * FROM dbo.account
                END
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[ACCOUNT_GET_BY_ID]
                @AccountNumberId BIGINT
                AS
                BEGIN
                    SELECT * FROM dbo.account WHERE Id = @AccountNumberId
                END
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[CLIENT_GET_ALL]
                AS
                BEGIN
                    SELECT c.*, p.name, p.gender, p.age, p.address, p.identification, p.phone
                    FROM dbo.client C INNER JOIN dbo.person P ON C.person_id = P.id
                END
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[CLIENT_GET_BY_ID]
                @ClienteId BIGINT
                AS
                BEGIN
                    SELECT c.*, p.name, p.gender, p.age, p.address, p.identification, p.phone
                    FROM dbo.client C INNER JOIN dbo.person P ON C.person_id = P.id
                    WHERE C.id = @ClienteId
                END
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[MOVEMENT_GET_ALL]
                AS
                BEGIN
                    SELECT *,
                        A.account_number as account,
                        P.name as client
                    FROM dbo.movement M
                    INNER JOIN dbo.account A ON M.account_id = A.Id
                    INNER JOIN dbo.client C ON A.client_id = C.Id
                    INNER JOIN dbo.person P ON C.person_id = P.Id
                END
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[MOVEMENT_GET_BY_ID]
                @MovementId BIGINT
                AS
                BEGIN
                    SELECT * FROM dbo.movement WHERE id = @MovementId
                END
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[MOVEMENT_GET_MOVEMENTS_BY_ACCOUNT_DATE]
                @AccountId BIGINT,
                @Date DATE
                AS
                BEGIN
                    SELECT id, date, transaction_type, amount, balance, account_id
                    FROM movement
                    WHERE account_id = @AccountId
                    AND CAST(date AS DATE) = @Date
                END
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[REPORT_GET]
                    @ClienteId BIGINT = 0
                AS
                BEGIN
                        SELECT
                            C.Id as client_id,
                            P.name AS client,
                            A.account_number AS account,
                            A.Id AS account_id,
                            A.current_balance AS current_balance,
                            A.daily_limit_amount AS daily_limit_amount,
                            A.initial_balance AS initial_balance,
                            M.amount AS amount,
                            M.[date] AS [date],
                            M.transaction_type AS transaction_type,
                            M.balance AS balance
                        FROM dbo.movement M
                        INNER JOIN dbo.account A ON M.account_id = A.Id
                        INNER JOIN dbo.client C ON A.client_id = C.Id
                        INNER JOIN dbo.person P ON C.person_id = P.Id
                        WHERE (@ClienteId = 0 OR C.Id = @ClienteId)
                END
            ");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[GET_ALL_PERSON]");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[PERSON_GET_BY_ID]");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[ACCOUNT_GET_ALL]");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[ACCOUNT_GET_BY_ID]");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[CLIENT_GET_ALL]");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[CLIENT_GET_BY_ID]");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[MOVEMENT_GET_ALL]");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[MOVEMENT_GET_BY_ID]");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[MOVEMENT_GET_MOVEMENTS_BY_ACCOUNT_DATE]");
        }
    }
}
