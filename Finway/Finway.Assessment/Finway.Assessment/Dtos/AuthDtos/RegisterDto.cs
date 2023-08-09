using System.ComponentModel.DataAnnotations;

namespace Finway.Assessment.API.Dtos.AuthDtos
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? UserName { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
