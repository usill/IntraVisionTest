using Orders.Domain.Entities;
using System.Linq.Expressions;

namespace Orders.Domain.Interfaces.Repositories
{
    public interface ICoinRepository : IRepository<Coin>
    {
        public Task<List<Coin>> GetAllAsync();
        public Task<List<T>> GetAllByExpressionAsync<T>(Expression<Func<Coin, T>> selector);
        public Task ClearAsync();
    }
}
