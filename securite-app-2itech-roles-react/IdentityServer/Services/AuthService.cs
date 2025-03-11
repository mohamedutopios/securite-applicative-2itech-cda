using IdentityServer.Models;

using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenGenerationService _tokenService;

        public AuthService(UserManager<IdentityUser> userManager, ITokenGenerationService tokenGenerationService) {
            _userManager = userManager;
            _tokenService = tokenGenerationService;
        }


        public async Task<IdentityResult> RegisterUserAsync(RegisterRequest request)
        {
            var user = new IdentityUser { UserName = request.Email, Email = request.Email };

            return await _userManager.CreateAsync(user, request.Password);
        }


        public async Task<TokenResponse> AuthenticateUserAsync(LoginRequest login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, login.Password))
            {
                return null;
            }

            var tokenResponse = await _tokenService.GenerateTokenAsync(user, login.Password);

            return tokenResponse;
        }


    }
}
