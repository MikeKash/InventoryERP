using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace InventoryERP.Models.Items
{
    public class Item
    {
        [Key]
        public Guid ItemID { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string ItemNumber { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(200)")]
        public string ItemDescription { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(5)")]
        public string ItemUM { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(10)")]
        public int MinInventory { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public int MaxInventory { get; set; }
    }
}
