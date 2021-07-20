using Microsoft.EntityFrameworkCore.Migrations;

namespace StudyBuddy.Migrations
{
    public partial class updateFavoritesUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userID",
                table: "Favorites",
                newName: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Favorites",
                newName: "userID");
        }
    }
}
