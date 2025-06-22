using Catalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Domain.ProductSpecification
{
    public class BrandSpecification : ISpecification<Product>
    {
        private readonly int? _brand;
        public BrandSpecification(int? brand)
        {
            _brand = brand;
            IsEmpty = brand is null;
        }
        public bool IsEmpty { get; } = true;
        public bool PriceRangeIgnore { get; } = false;
        public Expression<Func<Product, bool>>? Criteria => p => p.Brand.Id == _brand;
        public Func<IQueryable<Product>, IQueryable<Product>>? QueryModifier => null;
    }
}
