using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Application.Redis
{
    public static class RedisKeys
    {
        /// <summary>
        /// Start catalog page
        /// </summary>
        public static string ProductsMainList => "list:products:1:0:0";
        /// <summary>
        /// All brands
        /// </summary>
        public static string BrandsList => "list:brands";
    }
}
