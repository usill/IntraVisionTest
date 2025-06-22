using Catalog.Domain;
using Catalog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Infrastructure
{
    public class BrandRepository : IBrandRepository
    {
        private readonly AppDbContext _context;
        public BrandRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Brand>> GetAll()
        {
            return await _context.Brands.ToListAsync();
        }
        public async Task<Brand?> FindAsync(int id)
        {
            return await _context.Brands.FindAsync(id);
        }
        public async Task<Brand> AddAsync(Brand item)
        {
            var brand = await _context.Brands.AddAsync(item);
            await _context.SaveChangesAsync();
            return brand.Entity;
        }
        public async Task UpdateAsync(Brand item)
        {
            _context.Brands.Update(item);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Brand item)
        {
            _context.Brands.Remove(item);
            await _context.SaveChangesAsync();
        }
        public async Task RemoveAllAsync()
        {
            _context.Brands.RemoveRange(_context.Brands);
            await _context.SaveChangesAsync();
        }
        public async Task<Brand?> FindByName(string name)
        {
            return await _context.Brands.FirstOrDefaultAsync(b => b.Title == name);
        }
    }
}
