using Catalog.Application.DTO;
using Catalog.Domain;
using Catalog.Domain.Entities;
using Catalog.Domain.ProductSpecification;

namespace Catalog.Application
{
    public class ProductFiltersFactory
    {
        private const int DefaultLimit = 8;
        public List<ISpecification<Product>> _specList = new();
        public IEnumerable<ISpecification<Product>> PrepareSpecification(ProductFiltersDto filters)
        {
            if(filters.BrandId > 0)
            {
                _specList.Add(new BrandSpecification(filters.BrandId));
            }

            _specList.Add(new MinPriceSpecification(filters.MinPrice));
            _specList.Add(new LimitSpecification(DefaultLimit));
            _specList.Add(new OffsetSpecification(DefaultLimit * (filters.Page - 1)));

            return _specList;
        }
    }
}
