using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;

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

        // POST: Creates Enrolled
        [HttpPost]
        public async Task<ActionResult<Enrolled>> PostEnrolled(Enrolled Enrolled)
        {
            _context.Enrolled.Add(Enrolled);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEnrolled), new { id = Enrolled.enrolled_id }, Enrolled);  // Return 201 Created with the new Enrolled
        }

        // PUT: Updates existing Enrolled
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnrolled(int id, Enrolled Enrolled)
        {
            if (id != Enrolled.enrolled_id)
            {
                return BadRequest();  
            }

            _context.Entry(Enrolled).State = EntityState.Modified;

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

        // DELETE: Removes Enrolled
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
