using Catalog.Domain.Entities;
using Catalog.Domain.ProductFields;

namespace Catalog.Domain
{
    public interface IProductRepository : IRepository<Product>
    {
        public Task<IEnumerable<Product>> GetRangeAsync(IEnumerable<ISpecification<Product>> specifications);
        public Task<ProductPriceRange> GetPriceRange(IEnumerable<ISpecification<Product>> specifications);
        public Task AddRangeAsync(IEnumerable<Product> products);
    }
}
