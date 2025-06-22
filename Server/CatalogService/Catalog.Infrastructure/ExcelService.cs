using Catalog.Application;
using Catalog.Domain;
using Catalog.Domain.Entities;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;

namespace Catalog.Infrastructure
{
    public class ExcelService : IExcelService
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IConfiguration _configuration;
        public ExcelService(IBrandRepository brandRepository, IConfiguration configuration)
        {
            _brandRepository = brandRepository;
            _configuration = configuration;
        }
        public async Task<List<Product>> ParseAsync(FileInfo file, string wwwRootPath)
        {
            List<ExcelProduct> products = Prepare(file);
            List<Product> result = new();

            foreach (ExcelProduct excelProduct in products)
            {
                Brand? brand = await _brandRepository.FindByName(excelProduct.Brand);

                if(brand is null)
                {
                    brand = await _brandRepository.AddAsync(new Brand
                    {
                        Title = excelProduct.Brand
                    });
                }

                string imageExt = ".jpg";
                string imageName = Path.GetRandomFileName() + imageExt;
                string? imagePath = null;
                string? imageUrl = null;

                string imageDirectory = Path.Combine(wwwRootPath, "images");
                string imageDirectoryURL = _configuration.GetSection("ImagesUrl").Value;

                if (!Directory.Exists(imageDirectory))
                {
                    Directory.CreateDirectory(imageDirectory);
                }

                if (excelProduct.ImageBytes != null)
                {
                    imagePath = Path.Combine(imageDirectory, imageName);
                    imageUrl = Path.Combine(imageDirectoryURL, imageName);
                    await File.WriteAllBytesAsync(imagePath, excelProduct.ImageBytes);
                }

                var product = new Product
                {
                    Title = excelProduct.Title,
                    Brand = brand,
                    Price = excelProduct.Price,
                    ImageUrl = imageUrl,
                    InStock = excelProduct.InStock,
                };

                result.Add(product);
            }

            return result;
        }
        private List<ExcelProduct> Prepare(FileInfo file)
        {
            List<ExcelProduct> products = new();
            ExcelPackage.License.SetNonCommercialPersonal("<My Name>");

            using (var package = new ExcelPackage(file))
            {
                var worksheet = package.Workbook.Worksheets[0];
            
                var imageMap = new Dictionary<(int row, int col), byte[]>();

                foreach (var drawing in worksheet.Drawings.OfType<ExcelPicture>())
                {

                    var type = drawing.GetType().Name;
                    var row = drawing.From.Row + 1;
                    var col = drawing.From.Column + 1;
                    imageMap[(row, col)] = drawing.Image.ImageBytes;
                }

                int rowCount = worksheet.Dimension.Rows;

                for (int row = 1; row <= rowCount; row++)
                {
                    int price = 0;
                    int.TryParse(worksheet.Cells[row, 3].Text, out price);
                    imageMap.TryGetValue((row, 4), out byte[]? imageBytes);

                    bool inStock = worksheet.Cells[row, 5].Text == "Да" ? true : false ;

                    var product = new ExcelProduct
                    {
                        Title = worksheet.Cells[row, 1].Text,
                        Brand = worksheet.Cells[row, 2].Text,
                        Price = price,
                        ImageBytes = imageBytes,
                        InStock = inStock                    
                    };

                    products.Add(product);
                }
            }

            return products;
        }
    }
}
