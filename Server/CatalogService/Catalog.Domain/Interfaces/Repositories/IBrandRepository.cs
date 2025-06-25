using Catalog.Domain.Entities;

namespace Catalog.Domain.Interfaces.Repositories
{
    public interface IBrandRepository : IRepository<Brand>
    {
        public Task<List<Brand>> GetAll();
        public Task<Brand?> FindByName(string name);
    }
}
