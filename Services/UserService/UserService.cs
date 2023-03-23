using InventoryERP.Data;
using InventoryERP.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace InventoryERP.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly InventoryERPContext _context;

        public UserService(IHttpContextAccessor httpContextAccessor, InventoryERPContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        public User GetUserByEmail(string email) {
            return _context.Users.FirstOrDefault(e => e.UserEmail == email);
        }

        public User GetUserByRefreshToken(string refreshToken)
        {
            return _context.Users.FirstOrDefault(e => e.RefreshToken == refreshToken);
        }



        public bool UserExists(string email)
        {
            return _context.Users.FirstOrDefault(e => e.UserEmail == email) != null;
        }

        public async void UpdateUser (User user)
        {
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }
    }
}
