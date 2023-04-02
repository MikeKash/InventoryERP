using InventoryERP.Models;
using InventoryERP.Models.Items;
using Microsoft.EntityFrameworkCore;

namespace InventoryERP.Data
{
    public class InventoryERPContext: DbContext
    {
        public InventoryERPContext(DbContextOptions<InventoryERPContext> options): base(options) { 
        
        }
        public DbSet<User> Users { set; get; }
        public DbSet<Address> Addresses { set; get; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Item> Items { set; get; }
        public DbSet<PurchaseOrderDetail> PurchaseOrderDetailss { get; set; }
        public DbSet<PurchaseOrderMaster> PurchaseOrdersMaster { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.UserEmail).IsUnique(); });
        }
    }
}
