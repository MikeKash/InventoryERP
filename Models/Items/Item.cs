using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Text.Json.Serialization;


namespace InventoryERP.Models.Items
{
    public class Item
    {
        [Key]
        public Guid ItemID { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string ItemNumber { get; set; } = string.Empty;
        public int StockQty { get; set; } = 0;
        [Column(TypeName = "nvarchar(200)")]
        public string ItemDescription { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(5)")]
        public string ItemUM { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(10)")]
        public int MinInventory { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public int MaxInventory { get; set; }
        [JsonIgnore]
        [DefaultValue(true)]
        public Boolean IsActive { get; set; } = true;
        public Boolean AutoReorder { get; set; } = false;
    }
}
