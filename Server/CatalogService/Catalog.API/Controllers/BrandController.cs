using Catalog.Application.DTO;
using Catalog.Domain.Entities;
using Catalog.Domain.Interfaces.Repositories;
using Catalog.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
{
    [ApiController]
    [Route("/api/brand")]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IRedisCacheService _cacheService;
        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }
        [HttpGet("all")]
        public async Task<IEnumerable<Brand>> GetAll()
        {
            var cachedBrands = await _cacheService.GetAsync<List<Brand>>("list:brands");
            
            if(cachedBrands is not null)
            {
                return cachedBrands;
            }

            var brands = await _brandRepository.GetAll();
            await _cacheService.SetAsync("list:brands", brands, TimeSpan.FromMinutes(10));
            return brands;
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] BrandCreateDto brand)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var newBrand = new Brand
            {
                Title = brand.Title
            };

            try
            {
                await _brandRepository.AddAsync(newBrand);
                return Ok();
            }
            catch(Exception ex)
            {
                //log
                return Problem();
            }
        }
        [HttpGet("clear")]
        public async Task Clear()
        {
            await _brandRepository.RemoveAllAsync();
        }
    }
}
