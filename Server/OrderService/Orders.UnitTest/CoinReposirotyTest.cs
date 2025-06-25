using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;
using Orders.Infrastructure;
using Orders.Infrastructure.Repositories;
using Orders.Infrastructure.Services;

namespace Orders.UnitTest
{
    public class CoinReposirotyTest
    {
        [Fact]
        public async Task CheckCoinsAsync_ValidValues_ReturnsExpectedList()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            using var context = new AppDbContext(options);

            context.Coins.Add(new Coin { Value = 5, Count = 1 });
            context.SaveChanges();

            var repository = new CoinRepository(context);
            var service = new CoinService(repository);
            
            var result = await service.CheckCoinsAsync(5);

            Assert.Single(result);
            Assert.Equal(5, result[0].Value);
            Assert.Equal(1, result[0].Count);
        }
    }
}