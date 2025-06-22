using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Application.DTO
{
    public class ProductCreateDto
    {
        [Required]
        [MaxLength(100)]
        [MinLength(4)]
        public string Title { get; set; }
        [Required]
        public int BrandId { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public bool InStock { get; set; }
    }
}
