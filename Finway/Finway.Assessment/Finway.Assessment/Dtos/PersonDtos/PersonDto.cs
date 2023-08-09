using AutoMapper;
using Finway.Assessment.API.Dtos.CountryDtos;
using Finway.Assessment.DAL;

namespace Finway.Assessment.API.Dtos.PersonDtos
{
    public class PersonDto
    {
        public string? Image { get; set; }
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public DateTime? DateOfBirh { get; set; }

        public CountryDto? Country { get; set; }
        
    }
}
