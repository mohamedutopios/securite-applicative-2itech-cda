using IdentityServer.Models;
using IdentityServer.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IdentityServer.Controllers
{

    [Route("/api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenGenerationService _tokenService;


        public AuthController (UserManager<IdentityUser> userManager, ITokenGenerationService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }




        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if(!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User registred successfully");

        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return Unauthorized("Invalid Credentials");
            }

            var tokenResponse = await _tokenService.GenerateTokenAsync(user, model.Password);

            return Ok(tokenResponse);

        }






    }
}
