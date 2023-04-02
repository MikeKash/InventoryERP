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
using InventoryERP.Services;
using Newtonsoft.Json;
using InventoryERP.Models.Items;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;

namespace InventoryERP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ItemsController : Controller
    {
        private readonly InventoryERPContext _context;

        public ItemsController(InventoryERPContext context)
        {
            _context = context;
        }

        // GET: api/Items
        [HttpGet]
        //public async Task<ActionResult<IEnumerable<Item>>> GetItems([FromQuery] QueryStringParameters queryParameters)
        //{
        //    if (_context.Items == null)
        //    {
        //        return NotFound();
        //    }
        //    return await _context.Items.ToListAsync();
        //}

        public async Task<ActionResult<IEnumerable<Item>>> GetItems([FromQuery] ItemsQueryStringParameters queryParameters)
        {
            if (_context.Items == null)
            {
                return NotFound();
            }
            IQueryable<Item> items = _context.Items;

            if (!String.IsNullOrEmpty(queryParameters.Search))
            {
                items = items.Where(s => s.ItemNumber.Contains(queryParameters.Search)
                                       || s.ItemDescription.Contains(queryParameters.Search));
            }

            if (queryParameters.SortBy != null)
            {
                switch (queryParameters.SortBy)
                {
                    
                    case ItemsSortBy.ItemDescription:   
                        items = queryParameters.Desc ? items.OrderByDescending(i => i.ItemDescription) : items.OrderBy(i => i.ItemDescription);
                        break;
                    case ItemsSortBy.ItemUM:
                        items = queryParameters.Desc ? items.OrderByDescending(i => i.ItemUM) : items.OrderBy(i => i.ItemUM);
                        break;
                    case ItemsSortBy.MinInventory:
                        items = queryParameters.Desc ? items.OrderByDescending(i => i.MinInventory) : items.OrderBy(i => i.MinInventory);
                        break;
                    case ItemsSortBy.MaxInventory:
                        items = queryParameters.Desc ? items.OrderByDescending(i => i.MaxInventory) : items.OrderBy(i => i.MaxInventory);
                        break;
                    default:
                        items = queryParameters.Desc ? items.OrderByDescending(i => i.ItemNumber) : items.OrderBy(i => i.ItemNumber);
                        break;
                }
            }

         
            PaginatedList<Item> paginatedItemsList = await PaginatedList<Item>.CreateAsync(items, queryParameters.PageNumber, queryParameters.PageSize);

            var data = new
            {
                totalPages = paginatedItemsList.TotalPages,
                currentPage = paginatedItemsList.PageIndex,
                hasNextPage = paginatedItemsList.HasNextPage,
                hasPeviousPage = paginatedItemsList.HasPreviousPage,
                totalRecords = paginatedItemsList.TotalRecords,
                items = paginatedItemsList
            };
           
            return Ok(data);
        }


        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(Guid id)
        {
          if (_context.Items == null)
          {
              return NotFound();
          }
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // PUT: api/Items/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(Guid id, Item item)
        {
            if (id != item.ItemID)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
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

        // POST: api/Items
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
          if (_context.Items == null)
          {
              return Problem("Entity set 'InventoryERPContext.Items'  is null.");
          }
            if (ItemNumberExists(item.ItemNumber)) return BadRequest("Item Exists");

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = item.ItemID }, item);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            if (_context.Items == null)
            {
                return NotFound();
            }
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(Guid id)
        {
            return (_context.Items?.Any(e => e.ItemID == id)).GetValueOrDefault();
        }

        private bool ItemNumberExists(string iteNumber)
        {
            return (_context.Items?.Any(e => e.ItemNumber == iteNumber)).GetValueOrDefault();
        }
    }
}
