using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models
{
    public class Enrolled
    {
        [Key]
        public int enrolled_id { get; set; }

        [Required]
        [ForeignKey("Course")]
        public required int course_id{ get; set; }

        [Required]
        [ForeignKey("Student")]
        public required int student_id { get; set; }

        [Required]
        public required int capacity { get; set; }

        [Required]
        [StringLength(255)]
        public string semester { get; set; }

        public virtual Course Course { get; set; }
        public virtual Student Student { get; set; }

    }
}
