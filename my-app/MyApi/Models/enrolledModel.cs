using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MyApi.Models;

namespace MyApi.Models
{
    public class Enrolled
    {
        [Key]
        public int enrolled_id { get; set; }

        [Required]
        [ForeignKey("Course")]
        public int course_id{ get; set; }

        [Required]
        [ForeignKey("Student")]
        public int student_id { get; set; }

        [Required]
        public int capacity { get; set; }

        [Required]
        [StringLength(255)]
        public string semester { get; set; }

        public virtual Course Course { get; set; }
        public virtual Student Student { get; set; }

    }
}
