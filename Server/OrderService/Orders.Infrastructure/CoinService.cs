using Orders.Domain;

namespace Orders.Infrastructure
{
    public class CoinService : ICoinService
    {
        private readonly ICoinRepository _coinRepository;
        public CoinService(ICoinRepository coinRepository)
        {
            _coinRepository = coinRepository;
        }
        public async Task<List<Coin>?> CheckCoinsAsync(int price)
        {
            if (price < 0)
                return null;

            List<Coin> coins = await _coinRepository.GetAllAsync();
            List<Coin> removedCoins = new();
            int resultPrice = price;
            coins.Sort((a, b) => b.Value - a.Value);

            foreach (Coin coin in coins)
            {
                if (price < coin.Value)
                    continue;

                Coin removedCoin = new()
                {
                    Value = coin.Value,
                    Count = 0,
                };

                while (coin.Count > 0 && resultPrice >= coin.Value && resultPrice > 0)
                {
                    resultPrice -= coin.Value;

                    coin.Count--;
                    removedCoin.Count++;
                }

                if (removedCoin.Count > 0)
                {
                    removedCoins.Add(removedCoin);
                }
            }

            if (resultPrice == 0)
            {
                return removedCoins;
            }

            return null;
        }
    }
}
