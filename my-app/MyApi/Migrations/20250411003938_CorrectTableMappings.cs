using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApi.Migrations
{
    /// <inheritdoc />
    public partial class CorrectTableMappings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrolled_Course_student_id",
                table: "Enrolled");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrolled_Courses_course_id",
                table: "Enrolled");

            migrationBuilder.DropForeignKey(
                name: "FK_Professor_Assigned_Courses_course_id",
                table: "Professor_Assigned");

            migrationBuilder.DropForeignKey(
                name: "FK_Professor_Assigned_Professors_professor_id",
                table: "Professor_Assigned");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Professors",
                table: "Professors");

            migrationBuilder.DropColumn(
                name: "first_name",
                table: "Course");

            migrationBuilder.RenameTable(
                name: "Professors",
                newName: "Professor");

            migrationBuilder.RenameColumn(
                name: "major",
                table: "Course",
                newName: "course_name");

            migrationBuilder.RenameColumn(
                name: "last_name",
                table: "Course",
                newName: "course_department");

            migrationBuilder.RenameColumn(
                name: "student_id",
                table: "Course",
                newName: "course_id");

            migrationBuilder.AddColumn<int>(
                name: "credit_hours",
                table: "Course",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Professor",
                table: "Professor",
                column: "professor_id");

            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    student_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    first_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    last_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    major = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.student_id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Enrolled_Course_course_id",
                table: "Enrolled",
                column: "course_id",
                principalTable: "Course",
                principalColumn: "course_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enrolled_Student_student_id",
                table: "Enrolled",
                column: "student_id",
                principalTable: "Student",
                principalColumn: "student_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Professor_Assigned_Course_course_id",
                table: "Professor_Assigned",
                column: "course_id",
                principalTable: "Course",
                principalColumn: "course_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Professor_Assigned_Professor_professor_id",
                table: "Professor_Assigned",
                column: "professor_id",
                principalTable: "Professor",
                principalColumn: "professor_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrolled_Course_course_id",
                table: "Enrolled");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrolled_Student_student_id",
                table: "Enrolled");

            migrationBuilder.DropForeignKey(
                name: "FK_Professor_Assigned_Course_course_id",
                table: "Professor_Assigned");

            migrationBuilder.DropForeignKey(
                name: "FK_Professor_Assigned_Professor_professor_id",
                table: "Professor_Assigned");

            migrationBuilder.DropTable(
                name: "Student");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Professor",
                table: "Professor");

            migrationBuilder.DropColumn(
                name: "credit_hours",
                table: "Course");

            migrationBuilder.RenameTable(
                name: "Professor",
                newName: "Professors");

            migrationBuilder.RenameColumn(
                name: "course_name",
                table: "Course",
                newName: "major");

            migrationBuilder.RenameColumn(
                name: "course_department",
                table: "Course",
                newName: "last_name");

            migrationBuilder.RenameColumn(
                name: "course_id",
                table: "Course",
                newName: "student_id");

            migrationBuilder.AddColumn<string>(
                name: "first_name",
                table: "Course",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Professors",
                table: "Professors",
                column: "professor_id");

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    course_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    course_department = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    course_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    credit_hours = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.course_id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Enrolled_Course_student_id",
                table: "Enrolled",
                column: "student_id",
                principalTable: "Course",
                principalColumn: "student_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enrolled_Courses_course_id",
                table: "Enrolled",
                column: "course_id",
                principalTable: "Courses",
                principalColumn: "course_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Professor_Assigned_Courses_course_id",
                table: "Professor_Assigned",
                column: "course_id",
                principalTable: "Courses",
                principalColumn: "course_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Professor_Assigned_Professors_professor_id",
                table: "Professor_Assigned",
                column: "professor_id",
                principalTable: "Professors",
                principalColumn: "professor_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
