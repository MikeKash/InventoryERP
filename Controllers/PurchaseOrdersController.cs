using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InventoryERP.Data;
using InventoryERP.Models;
using Microsoft.AspNetCore.Authorization;

namespace InventoryERP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PurchaseOrdersController : ControllerBase
    {
        private readonly InventoryERPContext _context;

        public PurchaseOrdersController(InventoryERPContext context)
        {
            _context = context;
        }

        // GET: api/PurchaseOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseOrderMaster>>> GetPurchaseOrdersMaster()
        {
          if (_context.PurchaseOrdersMaster == null)
          {
              return NotFound();
          }
            return await _context.PurchaseOrdersMaster.ToListAsync();
        }

        // GET: api/PurchaseOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseOrderMaster>> GetPurchaseOrderMaster(Guid id)
        {
          if (_context.PurchaseOrdersMaster == null)
          {
              return NotFound();
          }
            var purchaseOrderMaster = await _context.PurchaseOrdersMaster.FindAsync(id);

            if (purchaseOrderMaster == null)
            {
                return NotFound();
            }

            return purchaseOrderMaster;
        }

        // PUT: api/PurchaseOrders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchaseOrderMaster(Guid id, PurchaseOrderMaster purchaseOrderMaster)
        {
            if (id != purchaseOrderMaster.PurchaseOrderMasterID)
            {
                return BadRequest();
            }

            _context.Entry(purchaseOrderMaster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseOrderMasterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PurchaseOrders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PurchaseOrderMaster>> PostPurchaseOrderMaster(PurchaseOrderMaster purchaseOrderMaster)
        {
          if (_context.PurchaseOrdersMaster == null)
          {
              return Problem("Entity set 'InventoryERPContext.PurchaseOrdersMaster'  is null.");
          }
            _context.PurchaseOrdersMaster.Add(purchaseOrderMaster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPurchaseOrderMaster", new { id = purchaseOrderMaster.PurchaseOrderMasterID }, purchaseOrderMaster);
        }

        // DELETE: api/PurchaseOrders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseOrderMaster(Guid id)
        {
            if (_context.PurchaseOrdersMaster == null)
            {
                return NotFound();
            }
            var purchaseOrderMaster = await _context.PurchaseOrdersMaster.FindAsync(id);
            if (purchaseOrderMaster == null)
            {
                return NotFound();
            }

            _context.PurchaseOrdersMaster.Remove(purchaseOrderMaster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseOrderMasterExists(Guid id)
        {
            return (_context.PurchaseOrdersMaster?.Any(e => e.PurchaseOrderMasterID == id)).GetValueOrDefault();
        }
    }
}
