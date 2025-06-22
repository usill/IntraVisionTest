using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Brand? Brand { get; set; }
        public int? BrandId { get; set; }
        public int Price { get; set; }
        public string? ImageUrl { get; set; }
        public bool InStock { get; set; }
    }
}
