using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models
{
    public class Course
    {
        [Key]
        public int course_id { get; set; }

        [Required]
        [StringLength(255)]
        public required string course_name { get; set; }

        [StringLength(255)]
        public required string course_department { get; set; }

        [Required]
        public required int credit_hours { get; set; }
        
    }
}
