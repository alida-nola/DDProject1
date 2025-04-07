using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models
{
    public class Professor
    {
        [Key]
        public int professor_id { get; set; }

        [Required]
        [StringLength(255)]
        public string first_name{ get; set; }

        [Required]
        [StringLength(255)]
        public string last_name { get; set; }

        [StringLength(255)]
        public string professor_department { get; set; }
    }
}
