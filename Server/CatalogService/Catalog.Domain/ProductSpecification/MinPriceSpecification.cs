using Catalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Domain.ProductSpecification
{
    public class MinPriceSpecification : ISpecification<Product>
    {
        private readonly int? _price;
        public MinPriceSpecification(int? price)
        {
            _price = price;
            IsEmpty = price is null;
        }
        public bool IsEmpty { get; } = true;
        public bool PriceRangeIgnore { get; } = true;
        public Expression<Func<Product, bool>>? Criteria => p => p.Price >= _price;
        public Func<IQueryable<Product>, IQueryable<Product>>? QueryModifier => null;
    }
}
