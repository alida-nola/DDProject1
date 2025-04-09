using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models
{
    public class Student
    {
        [Key]
        public int student_id { get; set; }

        [Required]
        [StringLength(255)]
        public required string first_name { get; set; }

        [Required]
        [StringLength(255)]
        public required string last_name { get; set; }

        [StringLength(255)]
        public string major { get; set; } = "Undeclared";

    }
}
