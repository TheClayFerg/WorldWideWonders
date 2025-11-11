using Microsoft.AspNetCore.Mvc;
using MapApi.Data;

namespace MapApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MapContext _context;

        public AuthController(MapContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User request)
        {
            if (string.IsNullOrWhiteSpace(request.Username))
                return BadRequest(new { message = "Username is required" });

            var existingUser = _context.Users.FirstOrDefault(u => u.Username == request.Username);

            if (existingUser == null)
            {
                // Create a new user if not found
                var newUser = new User { Username = request.Username};
                _context.Users.Add(newUser);
                _context.SaveChanges();
                return Ok(new { message = "New user created", user = newUser });
            }

            return Ok(new { message = "Welcome back!", user = existingUser });
        }
    }
}