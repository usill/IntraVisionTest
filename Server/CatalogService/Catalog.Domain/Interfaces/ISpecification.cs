using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Domain.Interfaces
{
    public interface ISpecification<T>
    {
        public Expression<Func<T, bool>>? Criteria { get; }
        public Func<IQueryable<T>, IQueryable<T>>? QueryModifier { get; }
        public bool PriceRangeIgnore { get; }
        public bool IsEmpty { get; }
    }
}
