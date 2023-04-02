namespace InventoryERP.Models
{
    public class ItemsQueryStringParameters: QueryStringParameters
    {
        public ItemsSortBy? SortBy { get; set; }
        public string? Search { get; set; }
        public bool Desc { get; set; }
    }
        public enum ItemsSortBy
    {
        ItemNumber,
        ItemUM,
        ItemDescription,
        MinInventory,
        MaxInventory,
    }
}
