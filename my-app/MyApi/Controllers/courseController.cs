using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CourseController(MyDbContext context)
        {
            _context = context;
        }

        // GET: Reads list of courses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            var Courses = await _context.Courses.ToListAsync();
            return Ok(Courses);  
        }

        // POST: Creates course
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(Course Course)
        {
            _context.Courses.Add(Course);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCourses), new { id = Course.Course_id }, Course);  // Return 201 Created with the new Course
        }

        // PUT: Updates existing course
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course Course)
        {
            if (id != Course.Course_id)
            {
                return BadRequest();  
            }

            _context.Entry(Course).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
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

        // DELETE: Removes course
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var Course = await _context.Courses.FindAsync(id);
            if (Course == null)
            {
                return NotFound();  
            }

            _context.Courses.Remove(Course);
            await _context.SaveChangesAsync();

            return NoContent();  
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.Course_id == id);
        }
    }
}
