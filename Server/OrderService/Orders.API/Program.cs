
using Microsoft.EntityFrameworkCore;
using Orders.Domain.Entities;
using Orders.Domain.Interfaces.Repositories;
using Orders.Domain.Interfaces.Services;
using Orders.Infrastructure;
using Orders.Infrastructure.Repositories;
using Orders.Infrastructure.Services;

namespace Orders.API
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

            builder.Services.AddDbContext<AppDbContext>(
                options => options.UseNpgsql(
                    builder.Configuration.GetConnectionString("PostgreSQL")));

            builder.Services.AddScoped<ICoinRepository, CoinRepository>();
            builder.Services.AddScoped<ICoinService, CoinService>();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    List<string> origins = new();

                    if (builder.Environment.IsDevelopment())
                    {
                        string devOrigin = builder.Configuration.GetSection("CorsOrigins:DevFrontendOrigin").Get<string>();
                        origins.Add(devOrigin);
                    }

                    string mainOrigin = builder.Configuration.GetSection("CorsOrigins:MainFrontendOrigin").Get<string>();
                    origins.Add(mainOrigin);

                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins(origins.ToArray());
                });
            });

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


                /*
                    Uppload start data for test 
                */
                if(app.Environment.IsDevelopment())
                {
                    Coin? checkCoin = db.Coins.FirstOrDefault();

                    if(checkCoin is null)
                    {
                        db.Coins.Add(new Coin
                        {
                            Value = 1,
                            Count = 16,
                        });
                        db.Coins.Add(new Coin
                        {
                            Value = 2,
                            Count = 6,
                        });
                        db.Coins.Add(new Coin
                        {
                            Value = 5,
                            Count = 5,
                        });
                        db.Coins.Add(new Coin
                        {
                            Value = 10,
                            Count = 9,
                        });

                        db.SaveChanges();
                    }
                }
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors();

            app.MapControllers();

            app.Run();
        }
    }
}
