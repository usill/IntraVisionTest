using Microsoft.EntityFrameworkCore;
using Orders.Domain;

namespace Orders.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public DbSet<Coin> Coins { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasMany(product => product.Products)
                .WithOne(p => p.Order)
                .HasForeignKey(p => p.OrderId);
        }
    }
}
