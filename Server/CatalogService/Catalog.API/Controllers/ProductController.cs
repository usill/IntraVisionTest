using Catalog.Application;
using Catalog.Application.DTO;
using Catalog.Domain.Entities;
using Catalog.Domain.Interfaces;
using Catalog.Domain.Interfaces.Repositories;
using Catalog.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
{
    [ApiController]
    [Route("/api/product")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IExcelService _excelService;
        private readonly IWebHostEnvironment _environment;
        private readonly IRedisCacheService _redis;
        public ProductController(
            IProductRepository productRepository, 
            IExcelService excelService,
            IWebHostEnvironment env,
            IRedisCacheService redis)
        {
            _productRepository = productRepository;
            _excelService = excelService;
            _environment = env;
            _redis = redis;
        }
        [HttpGet("list")]
        public async Task<ProductListDto> GetList([FromQuery] ProductFiltersDto filters)
        {
            var redisKey = $"list:{filters.Page}:{filters.BrandId}:{filters.MinPrice}";
            var redisValue = await _redis.GetAsync<ProductListDto>(redisKey);

            if(redisValue is not null)
            {
                return redisValue;
            }

            var filtersFactory = new ProductFiltersFactory();
            IEnumerable<ISpecification<Product>> filtersSpec = filtersFactory.PrepareSpecification(filters);

            var result = new ProductListDto
            {
                Products = await _productRepository.GetRangeAsync(filtersSpec),
                PriceRange = await _productRepository.GetPriceRange(filtersSpec)
            };

            // Default first page
            if(filters.Page == 1 && filters.BrandId == 0 && filters.MinPrice == 0)
            {
                await _redis.SetAsync(redisKey, result, TimeSpan.FromMinutes(15));
            }

            return result;
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] ProductCreateDto product)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var newProduct = new Product
            {
                Title = product.Title,
                BrandId = product.BrandId,
                Price = product.Price,
                InStock = product.InStock,
                ImageUrl = product.ImageUrl
            };

            try
            {
                await _productRepository.AddAsync(newProduct);
                return Ok();
            }
            catch(Exception ex)
            {
                // log
                return Problem();
            }
        }
        [HttpPost("import")]
        public async Task<IActionResult> ImportExcel(IFormFile file)
        {
            long maxSize = (long)Math.Pow(10, 9); // 1GB

            if (file is null || file.Length == 0 || file.Length > maxSize)
                return BadRequest();

            string tempFilePath = Path.GetTempFileName();
            var tempFile = new FileInfo(tempFilePath);

            using(var fs = tempFile.OpenWrite())
            {
                await file.CopyToAsync(fs);
            }

            try
            {
                List<Product> products = await _excelService.ParseAsync(tempFile, _environment.WebRootPath);
                await _productRepository.AddRangeAsync(products);
            }
            catch
            {
                return BadRequest();
            }
            finally
            {
                tempFile.Delete();
            }

            return Ok();
        }
        [HttpGet("clear")]
        public async Task Clear()
        {
            await _productRepository.RemoveAllAsync();
        }
    }
}
