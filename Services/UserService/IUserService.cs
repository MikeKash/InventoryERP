using InventoryERP.Models;

namespace InventoryERP.Services.UserService
{
    public interface IUserService
    {
        bool UserExists(string email);
        User GetUserByEmail(string email);
        User GetUserByRefreshToken(string refreshToken);
        void UpdateUser(User user);

    }
}
