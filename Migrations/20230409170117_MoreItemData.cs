using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryERP.Migrations
{
    /// <inheritdoc />
    public partial class MoreItemData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AutoReorder",
                table: "Items",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "StockQty",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AutoReorder",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "StockQty",
                table: "Items");
        }
    }
}
