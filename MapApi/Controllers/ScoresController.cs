using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MapApi.Data;

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Score>>> GetScores()
        {
            return await _context.Scores
                .OrderBy(s => s.Location)
                .ThenBy(s => s.Time)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Score>> PostScore(Score newScore)
        {
            if (string.IsNullOrWhiteSpace(newScore.PlayerName) || string.IsNullOrWhiteSpace(newScore.Location))
                return BadRequest("PlayerName and Location are required.");

            var existing = await _context.Scores
                .FirstOrDefaultAsync(s => s.PlayerName == newScore.PlayerName && s.Location == newScore.Location);

            if (existing != null)
            {
                if (newScore.Time < existing.Time)
                {
                    existing.Time = newScore.Time;
                    _context.Entry(existing).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
                return Ok(existing);
            }

            _context.Scores.Add(newScore);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetScores), new { id = newScore.Id }, newScore);
        }
    }
}