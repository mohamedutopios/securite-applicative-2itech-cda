

using IdentityServer.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Services
{
    public interface ITokenGenerationService
    {
        Task<TokenResponse> GenerateTokenAsync(IdentityUser user, string password);
    }
}
