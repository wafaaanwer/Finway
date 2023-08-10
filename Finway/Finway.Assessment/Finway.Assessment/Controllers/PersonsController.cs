using AutoMapper;
using Finway.Assessment.API.Dtos.PersonDtos;
using Finway.Assessment.BLL.Contracts;
using Finway.Assessment.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace Finway.Assessment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly IUnitOfWork UnitOfWork;
        private readonly IMapper Mapper;
        private readonly IWebHostEnvironment WebHostEnvironment;

        public PersonsController(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            UnitOfWork = unitOfWork;
            Mapper = mapper;
            WebHostEnvironment = webHostEnvironment;
        }

        [HttpGet("GetPerson/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPersonAsync(int id)
        {
            try
            {
                var result = await (await UnitOfWork.PersonRepository.GetAsync(i => i.Id == id)).FirstOrDefaultAsync();
                return Ok(Mapper.Map<PersonDto>(result));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "Sorry Error Occured!" });

            }
        }
        [HttpPost("FilterPerson")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FilterPersonAsync([FromBody]int? countryId)
        {
            try
            {
                var result = (await UnitOfWork.PersonRepository.GetAsync(i => countryId == null ? true : i.Country != null && i.Country.Id == countryId));
                return Ok(Mapper.Map<IEnumerable<PersonDto>>(result));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "Sorry Error Occured!" });

            }
        }
        [HttpPost("AddPerson")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> AddPersonAsync([FromForm] PersonAddEditDto person)
        {
            try
            {
                var personResult = Mapper.Map<Person>(person);
                personResult.Image = UploadedFile(person);
                var result = await UnitOfWork.PersonRepository.CreateAsync(personResult);
                await UnitOfWork.PersonRepository.SaveChangesAsync();
                return Ok(result);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "Sorry Error Occured!" });

            }
        }

        [HttpPut("EditPerson")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> EditPersonAsync([FromForm] PersonAddEditDto person)
        {
            try
            {
                var personResult = Mapper.Map<Person>(person);
                personResult.Image = UploadedFile(person);
                var result = await UnitOfWork.PersonRepository.UpdateAsync(personResult);
                await UnitOfWork.PersonRepository.SaveChangesAsync();
                return Ok(result);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "Sorry Error Occured!" });

            }
        }

        [HttpDelete("DeletePerson/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> DeletePersonAsync(int id)
        {
            try
            {
                var result = await UnitOfWork.PersonRepository.DeleteAsync(id);
                await UnitOfWork.PersonRepository.SaveChangesAsync();              
                return Ok(result);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "Sorry Error Occured!" });

            }
        }
        private string UploadedFile(PersonAddEditDto person)
        {
            string uniqueFileName = null;

            if (person.Image != null)
            {
                string uploadsFolder = Path.Combine(WebHostEnvironment.WebRootPath, "images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + person.Image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    person.Image.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }
    }
}
