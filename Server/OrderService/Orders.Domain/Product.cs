namespace Orders.Domain
{
    public class Product
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Title { get; set; }
        public int Count { get; set; }
        public Order Order { get; set; }
        public int OrderId { get; set; }
    }
}
