using Microsoft.AspNetCore.Mvc;
using Orders.Application.DTO;
using Orders.Domain;

namespace Orders.API.Controllers
{
    [ApiController]
    [Route("/api/coin")]
    public class CoinController
    {
        private readonly ICoinRepository _coinRepository;
        private readonly ICoinService _coinService;
        public CoinController(ICoinRepository coinRepository, ICoinService coinService)
        {
            _coinRepository = coinRepository;
            _coinService = coinService;
        }
        [HttpGet("all")]
        public async Task<List<ClientCoin>> GetAll()
        {
            return await _coinRepository.GetAllByExpressionAsync(c => new ClientCoin { Id = c.Id, Value = c.Value });
        }
        [HttpPost("check")]
        public async Task<CheckCoinsResult> CheckCoins([FromBody] int price)
        {
            List<Coin>? coins = await _coinService.CheckCoinsAsync(price);

            if(coins is null)
            {
                return new CheckCoinsResult
                {
                    Successed = false,
                    Coins = new(),
                    TextResult = "Извините, в данный момент мы не можем продать вам товар по причине того, что автомат не может выдать вам нужную сдачу"
                };
            }

            return new CheckCoinsResult
            {
                Successed = true,
                Coins = coins,
                TextResult = "Спасибо за вашу покупку, пожалуйста, возьмите вашу сдачу",
            };
        }
    }
}
