using Microsoft.EntityFrameworkCore;

namespace MapApi.Data
{
    public class MapContext : DbContext
    {
        public MapContext(DbContextOptions<MapContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Score> Scores { get; set; }
    }
}