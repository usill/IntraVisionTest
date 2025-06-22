using Catalog.Domain.Entities;
using Catalog.Domain.ProductFields;

namespace Catalog.Application.DTO
{
    public class ProductListDto
    {
        public IEnumerable<Product> Products { get; set; }
        public ProductPriceRange PriceRange { get; set; }
    }
}
