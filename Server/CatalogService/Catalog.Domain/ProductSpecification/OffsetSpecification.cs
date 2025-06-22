using Catalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Domain.ProductSpecification
{
    public class OffsetSpecification : ISpecification<Product>
    {
        private readonly int _offset;
        public OffsetSpecification(int offset)
        {
            _offset = offset;
        }
        public bool IsEmpty { get; } = false;
        public bool PriceRangeIgnore { get; } = true;
        public Expression<Func<Product, bool>>? Criteria => null;
        public Func<IQueryable<Product>, IQueryable<Product>>? QueryModifier => query => query.Skip(_offset);
    }
}
