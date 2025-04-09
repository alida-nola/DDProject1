using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models
{
    public class ProfessorAssigned
    {
        [Key]
        public int assigned_id { get; set; }

        [Required]
        [ForeignKey("Professor")]
        public required int professor_id { get; set; }

        [Required]
        [ForeignKey("Course")]
        public required int course_id{ get; set; }

        [Required]
        [StringLength(255)]
        public required string semester { get; set; }

        public virtual Course Course { get; set; }
        public virtual Professor Professor { get; set; }

    }
}
