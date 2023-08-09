using AutoMapper;
using Finway.Assessment.API.CustomAttributes;
using Finway.Assessment.DAL;
using System.ComponentModel.DataAnnotations;

namespace Finway.Assessment.API.Dtos.PersonDtos
{
    public class PersonAddEditDto 
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        public DateTime? DateOfBirh { get; set; }

        public int? CountryId { get; set; }
        [MaxFileSize(2 * 1024 * 1024)]
        [AllowedExtensions(new string[] { ".jpeg", ".ng", ".pmb" })]
        public IFormFile? Image { get; set; }
        

    }
}
