namespace Orders.Domain
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TotalCount { get; set; }
        public List<Product> Products { get; set; }
    }
}
