// Main class that interacts with database in EF
using Microsoft.EntityFrameworkCore;
using MyApi.Models;
using MyApi.Data;

namespace MyApi.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        // Existing DbSets
        public DbSet<Student> Students { get; set; }
        public DbSet<Professor> Professors { get; set; }
        public DbSet<Course> Courses { get; set; }

        // Joined DbSets
        public DbSet<ProfessorAssigned> ProfessorAssigned { get; set; }
        public DbSet<Enrolled> Enrolled { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Explicit connections to Dbsets
            modelBuilder.Entity<Student>().ToTable("Student");
            modelBuilder.Entity<Student>().ToTable("Professor");
            modelBuilder.Entity<Student>().ToTable("Course");
            modelBuilder.Entity<ProfessorAssigned>().ToTable("Professor_Assigned");
            modelBuilder.Entity<Enrolled>().ToTable("Enrolled");
        }
    }
}
