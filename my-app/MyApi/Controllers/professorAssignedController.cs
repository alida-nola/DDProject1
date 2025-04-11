using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssignedController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AssignedController(MyDbContext context)
        {
            _context = context;
        }

        // GET: Reads list of Assigneds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assigned>>> GetAssigneds()
        {
            var Assigneds = await _context.Assigneds.ToListAsync();
            return Ok(Assigneds);  
        }

        // POST: Creates Assigned
        [HttpPost]
        public async Task<ActionResult<Assigned>> PostAssigned(Assigned Assigned)
        {
            _context.Assigneds.Add(Assigned);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAssigneds), new { id = Assigned.Assigned_id }, Assigned);  // Return 201 Created with the new Assigned
        }

        // PUT: Updates existing Assigned
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssigned(int id, Assigned Assigned)
        {
            if (id != Assigned.Assigned_id)
            {
                return BadRequest();  
            }

            _context.Entry(Assigned).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignedExists(id))
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

        // DELETE: Removes Assigned
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssigned(int id)
        {
            var Assigned = await _context.Assigneds.FindAsync(id);
            if (Assigned == null)
            {
                return NotFound();  
            }

            _context.Assigneds.Remove(Assigned);
            await _context.SaveChangesAsync();

            return NoContent();  
        }

        private bool AssignedExists(int id)
        {
            return _context.Assigneds.Any(e => e.Assigned_id == id);
        }
    }
}
