using System.Linq.Expressions;

namespace Orders.Domain
{
    public interface ICoinRepository : IRepository<Coin>
    {
        public Task<List<Coin>> GetAllAsync();
        public Task<List<T>> GetAllByExpressionAsync<T>(Expression<Func<Coin, T>> selector);
        public Task ClearAsync();
    }
}
