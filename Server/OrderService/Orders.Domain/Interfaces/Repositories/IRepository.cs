namespace Orders.Domain.Interfaces.Repositories
{
    public interface IRepository<T>
    {
        public Task<T?> FindAsync(int id);
        public Task AddAsync(T item);
        public Task UpdateAsync(T item);
        public Task DeleteAsync(T item);
    }
}
