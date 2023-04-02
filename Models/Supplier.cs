using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace InventoryERP.Models
{
    public class Supplier
    {
        [Key]
        public Guid SupplierID { get; set; }
        public Guid AddressID { get; set; }
        public Address Address { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string SupplierName { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(100)")]
        public string SupplierCountry { get; set; } = string.Empty;
    }
}
