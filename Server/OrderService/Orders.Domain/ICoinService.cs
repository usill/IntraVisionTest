
namespace Orders.Domain
{
    public interface ICoinService
    {
        public Task<List<Coin>?> CheckCoinsAsync(int price);
    }
}
