namespace Catalog.Domain
{
    public interface IRepository<T>
    {
        public Task<T?> FindAsync(int id);
        public Task<T> AddAsync(T item);
        public Task UpdateAsync(T item);
        public Task DeleteAsync(T item);
        public Task RemoveAllAsync();
    }
}
