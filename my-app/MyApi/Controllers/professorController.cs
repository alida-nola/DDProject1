using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ProfessorController(MyDbContext context)
        {
            _context = context;
        }

        // GET: Reads list of professors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Professor>>> GetProfessors()
        {
            var Professors = await _context.Professors.ToListAsync();
            return Ok(Professors);  
        }

        // POST: Creates professor
        [HttpPost]
        public async Task<ActionResult<Professor>> PostProfessor(Professor Professor)
        {
            _context.Professors.Add(Professor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProfessors), new { id = Professor.professor_id }, Professor);  // Return 201 Created with the new Professor
        }

        // PUT: Updates existing professor
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfessor(int id, Professor Professor)
        {
            if (id != Professor.professor_id)
            {
                return BadRequest();  
            }

            _context.Entry(Professor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfessorExists(id))
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

        // DELETE: Removes professor
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfessor(int id)
        {
            var Professor = await _context.Professors.FindAsync(id);
            if (Professor == null)
            {
                return NotFound();  
            }

            _context.Professors.Remove(Professor);
            await _context.SaveChangesAsync();

            return NoContent();  
        }

        private bool ProfessorExists(int id)
        {
            return _context.Professors.Any(e => e.professor_id == id);
        }
    }
}
