using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MyApi.Models;
using MyApi.Models.Dto;  

namespace MyApi.Models.Dto
{
    public class UpdateProfessorAssignedDto
    {
        public int professor_id { get; set; }
        public int course_id { get; set; }
        public string semester { get; set; }
    }
}
