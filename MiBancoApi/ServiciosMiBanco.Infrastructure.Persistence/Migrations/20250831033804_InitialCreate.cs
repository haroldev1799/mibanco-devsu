using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiciosMiBanco.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "person",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    gender = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    age = table.Column<int>(type: "int", nullable: false),
                    identification = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    address = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_person", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "client",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    person_id = table.Column<long>(type: "bigint", nullable: false),
                    password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_client", x => x.Id);
                    table.ForeignKey(
                        name: "FK_client_person_person_id",
                        column: x => x.person_id,
                        principalSchema: "dbo",
                        principalTable: "person",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "account",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    account_number = table.Column<long>(type: "bigint", nullable: false),
                    type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    initial_balance = table.Column<decimal>(type: "decimal(12,2)", nullable: false),
                    current_balance = table.Column<decimal>(type: "decimal(12,2)", nullable: false),
                    daily_limit_amount = table.Column<decimal>(type: "decimal(12,2)", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    client_id = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_account", x => x.Id);
                    table.ForeignKey(
                        name: "FK_account_client_client_id",
                        column: x => x.client_id,
                        principalSchema: "dbo",
                        principalTable: "client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "movement",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    transaction_type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    amount = table.Column<decimal>(type: "decimal(12,2)", nullable: false),
                    balance = table.Column<decimal>(type: "decimal(12,2)", nullable: false),
                    account_id = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_movement_account_account_id",
                        column: x => x.account_id,
                        principalSchema: "dbo",
                        principalTable: "account",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_account_client_id",
                schema: "dbo",
                table: "account",
                column: "client_id");

            migrationBuilder.CreateIndex(
                name: "IX_client_person_id",
                schema: "dbo",
                table: "client",
                column: "person_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_movement_account_id",
                schema: "dbo",
                table: "movement",
                column: "account_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "movement",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "account",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "client",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "person",
                schema: "dbo");
        }
    }
}
