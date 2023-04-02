using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace InventoryERP.Models
{
    public class PurchaseOrderMaster
    {
        [Key]
        public Guid PurchaseOrderMasterID { get; set; }

        [Column(TypeName = "nvarchar(75)")]
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public DateTime OrderDueDate { get; set; }

        public Guid SupplierID { get; set; }
        public Supplier Supplier { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string POTerms { get; set; }

        public decimal POGrandTotal { get; set; }

        public List<PurchaseOrderDetail> PurchaseOrderDetails { get; set; }

        [NotMapped]
        public string DeletedOrderItems { get; set; } = string.Empty;
    }
}
