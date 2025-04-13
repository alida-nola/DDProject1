using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MyApi.Models;

namespace MyApi.Models.Dto
{
    public class EnrolledDto
    {
        public int course_id { get; set; }
        public int student_id { get; set; }
        public int capacity { get; set; }
        public string semester { get; set; }
    }
    
}
