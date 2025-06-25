using Catalog.Domain.Interfaces.Repositories;
using Catalog.Domain.Interfaces.Services;
using Catalog.Infrastructure;
using Catalog.Infrastructure.Repositories;
using Catalog.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

namespace Catalog.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    List<string> origins = new();

                    if(builder.Environment.IsDevelopment())
                    {
                        string devOrigin = builder.Configuration.GetSection("CorsOrigins:DevFrontendOrigin").Get<string>();
                        origins.Add(devOrigin);
                    }

                    string mainOrigin = builder.Configuration.GetSection("CorsOrigins:MainFrontendOrigin").Get<string>();
                    origins.Add(mainOrigin);

                    policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins(origins.ToArray());
                });
            });

            builder.Services.AddDbContext<AppDbContext>(
                options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL"))
            );

            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<IBrandRepository, BrandRepository>();
            builder.Services.AddScoped<IExcelService, ExcelService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.Migrate();
            }

            app.UseCors();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseStaticFiles();

            app.MapControllers();

            app.Run();
        }
    }
}
