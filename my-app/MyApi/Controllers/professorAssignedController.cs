using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;

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
        public async Task<ActionResult<ProfessorAssigned>> PostProfessorAssigned(ProfessorAssigned professorAssigned)
        {
            _context.ProfessorAssigned.Add(professorAssigned);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProfessorAssigned), new { id = professorAssigned.professorAssigned_id }, professorAssigned);  // Corrected to match model's property name
        }

        // PUT: Update
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfessorAssigned(int id, ProfessorAssigned professorAssigned)
        {
            if (id != professorAssigned.professorAssigned_id)  // Corrected to match model's property name
            {
                return BadRequest();
            }

            _context.Entry(professorAssigned).State = EntityState.Modified;

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
            return _context.ProfessorAssigned.Any(e => e.professorAssigned_id == id);  // Corrected to match model's property name
        }
    }
}
