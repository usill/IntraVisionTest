using Catalog.Domain.Entities;
using Catalog.Domain.Interfaces;
using Catalog.Domain.Interfaces.Repositories;
using Catalog.Domain.ProductFields;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ProductPriceRange> GetPriceRange(IEnumerable<ISpecification<Product>> specifications)
        {
            var range = new ProductPriceRange();
            IQueryable<Product> query = _context.Products;

            foreach(var spec in specifications)
            {
                if(spec.Criteria is not null && !spec.PriceRangeIgnore)
                {
                    query = query.Where(spec.Criteria);
                }
            }

            if(query.Any())
            {
                range.MaxPrice = await query.MaxAsync(product => product.Price);
                range.MinPrice = await query.MinAsync(product => product.Price);
            }

            return range;
        }
        public async Task<IEnumerable<Product>> GetRangeAsync(IEnumerable<ISpecification<Product>> specifications)
        {
            IQueryable<Product> query = _context.Products;

            foreach (var spec in specifications)
            {
                if (spec.Criteria is not null)
                {
                    query = query.Where(spec.Criteria);
                }
                if (spec.QueryModifier is not null)
                {
                    query = spec.QueryModifier(query);
                }
            }

            return await query.ToListAsync();
        }
        public async Task RemoveAllAsync()
        {
            _context.Products.RemoveRange(_context.Products);
            await _context.SaveChangesAsync();
        }
        public async Task AddRangeAsync(IEnumerable<Product> products)
        {
            await _context.Products.AddRangeAsync(products);
            await _context.SaveChangesAsync();
        }
        public async Task<Product?> FindAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }
        public async Task<Product> AddAsync(Product item)
        {
            var product = await _context.Products.AddAsync(item);
            await _context.SaveChangesAsync();
            return product.Entity;
        }
        public async Task UpdateAsync(Product item)
        {
            _context.Products.Update(item);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Product item)
        {
            _context.Products.Remove(item);
            await _context.SaveChangesAsync();
        }
    }
}
