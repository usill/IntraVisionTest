using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Domain.Interfaces.Services
{
    public interface IRedisCacheService
    {
        public Task<T?> GetAsync<T>(string key);
        public Task SetAsync(string key, object value, TimeSpan? expiry);
    }
}
