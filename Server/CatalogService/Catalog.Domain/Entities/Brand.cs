using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Domain.Entities
{
    public class Brand
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Product> Products { get; set; }
    }
}
