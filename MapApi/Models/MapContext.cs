using Microsoft.EntityFrameworkCore;

namespace MapApi.Models
{
    public class MapContext : DbContext
    {
        public MapContext(DbContextOptions<MapContext> options)
            : base(options)
        {
        }

        public DbSet<Score> Scores { get; set; } = null!;
    }
}