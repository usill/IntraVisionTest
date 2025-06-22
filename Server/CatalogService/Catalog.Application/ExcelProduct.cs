using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Application
{
    public class ExcelProduct
    {
        public string Title { get; set; }
        public string Brand { get; set; }
        public int Price { get; set; }
        public bool InStock { get; set; }
        public byte[]? ImageBytes { get; set; }
    }
}
