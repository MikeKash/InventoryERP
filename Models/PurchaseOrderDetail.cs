using System.ComponentModel.DataAnnotations;
using InventoryERP.Models.Items;

namespace InventoryERP.Models
{
    public class PurchaseOrderDetail
    {
        [Key]
        public Guid PurchaseOrderDetailID { get; set; }
        public Guid PurchaseOrderMasterID { get; set; }
        public Guid ItemID { get; set; }
        public Item Item { get; set; }
        public int QtyOrdered { get; set; }
        public int QtyReceived { get; set; }
        public decimal ItemPrice { get; set; }
        public decimal ItemGrandTotal { get; set; }
    }
}
