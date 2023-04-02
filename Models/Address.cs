using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryERP.Models
{
    public class Address
    {
        public Guid AddressID { get; set; }

        [Column(TypeName = "nvarchar(50)")] 
        public string Country { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(50)")] 
        public string State { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(50)")]
        public string City { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(100)")]
        public string StreetAddress { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(6)")]
        public string PostalCode { get; set; } = string.Empty;
        public AddressType Type { get; set; } = AddressType.Main;
    }
    public enum AddressType
    {
        ShipTo,
        BillTo,
        Main
    }
}
