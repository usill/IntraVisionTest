using Orders.Domain.Entities;

namespace Orders.Domain.Interfaces.Services
{
    public interface ICoinService
    {
        public Task<List<Coin>?> CheckCoinsAsync(int price);
    }
}
