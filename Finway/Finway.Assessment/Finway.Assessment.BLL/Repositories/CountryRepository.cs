using Finway.Assessment.BLL.Contracts;
using Finway.Assessment.DAL;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace Finway.Assessment.BLL.Repositories
{
    public class CountryRepository : ICountryRepository
    {
        private readonly FinwayAssessmentDbContext context;
        private readonly DbSet<Country> dbSet;

        public CountryRepository(FinwayAssessmentDbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<Country>();
        }

        public async Task<IEnumerable<Country>> GetAsync(Expression<Func<Country, bool>>? filter = null)
        {
            IQueryable<Country> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await Task.FromResult(query);
        }

    }
}
