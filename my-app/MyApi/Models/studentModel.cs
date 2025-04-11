using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models
{
    [Table("Student")] 
    public class Student
    {
        [Key]
        public int student_id { get; set; }

        [Required]
        [StringLength(255)]
        public string first_name { get; set; }

        [Required]
        [StringLength(255)]
        public string last_name { get; set; }

        [StringLength(255)]
        public string major { get; set; } = "Undeclared";

    }
}
