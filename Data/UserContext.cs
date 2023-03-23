using InventoryERP.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryERP.Data
{
    public class InventoryERPContext: DbContext
    {
        public InventoryERPContext(DbContextOptions<InventoryERPContext> options): base(options) { 
        
        }
        public DbSet<User> Users { set; get; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.UserEmail).IsUnique(); });
        }
    }
}
