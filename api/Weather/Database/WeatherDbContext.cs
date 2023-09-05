using Microsoft.EntityFrameworkCore;

public class WeatherDbContext : DbContext {
    public WeatherDbContext(DbContextOptions<WeatherDbContext> options) : base(options) {}

    public DbSet<City> Cities { get; set; }
    public DbSet<Coordinates> Coordinates { get; set; }
}