namespace Orders.Domain
{
    public interface IRepository<T>
    {
        public Task<T?> FindAsync(int id);
        public Task AddAsync(T item);
        public Task UpdateAsync(T item);
        public Task DeleteAsync(T item);
    }
}
