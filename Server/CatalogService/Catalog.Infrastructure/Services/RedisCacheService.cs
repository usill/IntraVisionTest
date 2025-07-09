using Catalog.Domain.Interfaces.Services;
using StackExchange.Redis;
using System.Text.Json;

namespace Catalog.Infrastructure.Services
{
    public class RedisCacheService : IRedisCacheService
    {
        private readonly IDatabase _db;
        public RedisCacheService(IConnectionMultiplexer redis)
        {
            _db = redis.GetDatabase();
        }
        public async Task<T?> GetAsync<T>(string key)
        {
            var cachedValue = await _db.StringGetAsync(key);

            if(!cachedValue.IsNull)
            {
                return JsonSerializer.Deserialize<T>(cachedValue);
            }

            return default;
        }
        public async Task SetAsync(string key, object value, TimeSpan? expiry = null)
        {
            await _db.StringSetAsync(key, JsonSerializer.Serialize(value), expiry);
        }
        public async Task RemoveAsync(string key)
        {
            await _db.KeyDeleteAsync(key);
        }
        public async Task UpdateAsync(string key, object value, TimeSpan? expiry)
        {
            await RemoveAsync(key);
            await SetAsync(key, value, expiry);
        }
    }
}
