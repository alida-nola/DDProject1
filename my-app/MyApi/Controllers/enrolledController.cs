using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;
using MyApi.Models.Dto;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrolledController : ControllerBase
    {
        private readonly MyDbContext _context;

        public EnrolledController(MyDbContext context)
        {
            _context = context;
        }

        // GET: Reads list of Enrolled
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enrolled>>> GetEnrolled()
        {
            var Enrolled = await _context.Enrolled
                .Include(e => e.Course)
                .Include(e => e.Student)
                .ToListAsync();

            return Ok(Enrolled);  
        }

        // POST: Creates a new enrollment
        [HttpPost]
        public async Task<ActionResult<Enrolled>> PostEnrolled([FromBody] EnrolledDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );

                return BadRequest(new
                {
                    message = "Validation failed",
                    errors
                });
            }

            var enrolled = new Enrolled
            {
                course_id = dto.course_id,
                student_id = dto.student_id,
                capacity = dto.capacity,
                semester = dto.semester
            };

            _context.Enrolled.Add(enrolled);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEnrolled), new { id = enrolled.enrolled_id }, enrolled);
        }

        // UPDATE: Updates exisiting enrollment
       [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEnrollment(int id, [FromBody] UpdateEnrolledDto dto)
        {
            var enrolled = await _context.Enrolled.FindAsync(id);
            if (enrolled == null)
            {
                return NotFound();
            }

            // Update values from DTO
            enrolled.course_id = dto.course_id;
            enrolled.student_id = dto.student_id;
            enrolled.capacity = dto.capacity;
            enrolled.semester = dto.semester;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnrolledExists(id))
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

        // DELETE: Removes an enrollment
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnrolled(int id)
        {
            var Enrolled = await _context.Enrolled.FindAsync(id);
            if (Enrolled == null)
            {
                return NotFound();  
            }

            _context.Enrolled.Remove(Enrolled);
            await _context.SaveChangesAsync();

            return NoContent();  
        }

        private bool EnrolledExists(int id)
        {
            return _context.Enrolled.Any(e => e.enrolled_id == id);
        }
    }
}
