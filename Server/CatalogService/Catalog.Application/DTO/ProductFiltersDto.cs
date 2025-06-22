namespace Catalog.Application.DTO
{
    public class ProductFiltersDto
    {
        public int? BrandId { get; set; } = 0;
        public int? MinPrice { get; set; } = 0;
        public int Page { get; set; } = 1;
    }
}
