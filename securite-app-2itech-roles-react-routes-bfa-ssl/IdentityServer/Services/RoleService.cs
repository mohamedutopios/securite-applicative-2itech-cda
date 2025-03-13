using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Services
{
    public class RoleService : IRoleService
    {

        private readonly UserManager<IdentityUser> _userManager;

        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {

            _userManager = userManager;
            _roleManager = roleManager;

        }

        public async Task AssignRoleAsync(string email, string role)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return;
            
            await _userManager.AddToRoleAsync(user, role);

        }
    }
}

