using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MapApi.Models;

namespace MapApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoresController : ControllerBase
    {
        private readonly MapContext _context;

        public ScoresController(MapContext context)
        {
            _context = context;
        }

        // GET: api/Scores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Score>>> GetScores()
        {
            // Return top 10 scores sorted descending
            return await _context.Scores
                .OrderByDescending(s => s.Points)
                .Take(10)
                .ToListAsync();
        }

        // POST: api/Scores
        [HttpPost]
        public async Task<ActionResult<Score>> PostScore(Score score)
        {
            _context.Scores.Add(score);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetScores), new { id = score.Id }, score);
        }
    }
}