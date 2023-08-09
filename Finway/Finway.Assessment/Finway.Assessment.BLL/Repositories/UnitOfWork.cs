using Finway.Assessment.BLL.Contracts;
using Finway.Assessment.DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Finway.Assessment.BLL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly FinwayAssessmentDbContext context;
        private ICountryRepository? countryRepository;
        private IPersonRepository? personRepository;
        // private IAuthRepository? authRepository;
        public UnitOfWork(FinwayAssessmentDbContext context)
        {
            this.context = context;
        }

        public ICountryRepository CountryRepository => countryRepository ?? new CountryRepository(context);

        public IPersonRepository PersonRepository => personRepository ?? new PersonRepository(context);
        // public IAuthRepository AuthRepository => authRepository ?? new AuthRepository();

        public async Task<int> Save()
        {
            return await context.SaveChangesAsync();
        }
    }
}
