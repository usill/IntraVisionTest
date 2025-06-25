using Catalog.Application.DTO;
using Catalog.Domain.Entities;
using Catalog.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
{
    [ApiController]
    [Route("/api/brand")]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;
        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }
        [HttpGet("all")]
        public async Task<IEnumerable<Brand>> GetAll()
        {
            return await _brandRepository.GetAll();
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
