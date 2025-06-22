using Microsoft.EntityFrameworkCore;
using Orders.Domain;
using System.Linq.Expressions;

namespace Orders.Infrastructure
{
    public class CoinRepository : ICoinRepository
    {
        private readonly AppDbContext _context;
        public CoinRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Coin>> GetAllAsync()
        {
            return await _context.Coins.ToListAsync();
        }
        public async Task<List<T>> GetAllByExpressionAsync<T>(Expression<Func<Coin, T>> selector)
        {
            return await _context.Coins
                .Select(selector)
                .ToListAsync();
        }
        public async Task ClearAsync()
        {
            _context.Coins.RemoveRange(_context.Coins);
            await _context.SaveChangesAsync();
        }
        public async Task<Coin?> FindAsync(int id)
        {
            return await _context.Coins.FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task AddAsync(Coin item)
        {
            await _context.AddAsync(item);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Coin item)
        {
            _context.Update(item);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Coin item)
        {
            _context.Remove(item);
            await _context.SaveChangesAsync();
        }
    }
}
