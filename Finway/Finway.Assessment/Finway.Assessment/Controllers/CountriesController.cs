using AutoMapper;
using Finway.Assessment.API.Dtos.CountryDtos;
using Finway.Assessment.BLL.Contracts;
using Finway.Assessment.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Finway.Assessment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly IMapper Mapper;
        private readonly IUnitOfWork UnitOfWork;

        public CountriesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            Mapper = mapper;
            UnitOfWork = unitOfWork;
        }
        [HttpGet("GetCountries")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCountriesAsync()
        {
            try
            {
             
                return Ok(Mapper.Map<IEnumerable<CountryDto>>(await UnitOfWork.CountryRepository.GetAsync()));
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "Sorry Error Occured!" });

            }
        }
    }
}
