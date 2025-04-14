using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;
using MyApi.Models.Dto;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessorAssignedController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ProfessorAssignedController(MyDbContext context)
        {
            _context = context;
        }

        // GET: Read all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfessorAssigned>>> GetProfessorAssigned()
        {
            var professorAssignedList = await _context.ProfessorAssigned.ToListAsync();
            return Ok(professorAssignedList);
        }

        // POST: Create
        [HttpPost]
        public async Task<ActionResult<ProfessorAssigned>> PostProfessorAssigned([FromBody] CreateProfessorAssignedDto createProfessorAssignedDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(new { message = "Model validation failed", errors });
            }

            var professorAssigned = new ProfessorAssigned
            {
                professor_id = createProfessorAssignedDto.professor_id,
                course_id = createProfessorAssignedDto.course_id,
                semester = createProfessorAssignedDto.semester
            };

            _context.ProfessorAssigned.Add(professorAssigned);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProfessorAssigned), new { id = professorAssigned.assigned_id }, professorAssigned);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfessorAssigned(int id, [FromBody] UpdateProfessorAssignedDto updateProfessorAssignedDto)
        {
            if (id != updateProfessorAssignedDto.professor_id)
            {
                return BadRequest("ID mismatch");
            }

            var professorAssigned = await _context.ProfessorAssigned.FindAsync(id);
            if (professorAssigned == null)
            {
                return NotFound();
            }

            professorAssigned.professor_id = updateProfessorAssignedDto.professor_id;
            professorAssigned.course_id = updateProfessorAssignedDto.course_id;
            professorAssigned.semester = updateProfessorAssignedDto.semester;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfessorAssignedExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();  
        }

        // DELETE: Remove
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfessorAssigned(int id)
        {
            var professorAssigned = await _context.ProfessorAssigned.FindAsync(id);
            if (professorAssigned == null)
            {
                return NotFound();
            }

            _context.ProfessorAssigned.Remove(professorAssigned);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfessorAssignedExists(int id)
        {
            return _context.ProfessorAssigned.Any(e => e.assigned_id == id);  // Corrected to match model's property name
        }
    }
}
