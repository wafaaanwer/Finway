using AutoMapper;
using Finway.Assessment.API.Dtos.CountryDtos;
using Finway.Assessment.API.Dtos.PersonDtos;
using Finway.Assessment.DAL;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Finway.Assessment.API.Dtos
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Country, CountryDto>().ReverseMap();
            CreateMap<Person, PersonAddEditDto>().ReverseMap();
            CreateMap<Person, PersonDto>().ReverseMap();

        }
    }
}
