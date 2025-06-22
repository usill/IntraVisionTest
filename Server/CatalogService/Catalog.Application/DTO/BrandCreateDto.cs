using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Application.DTO
{
    public class BrandCreateDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Title { get; set; }
    }
}
