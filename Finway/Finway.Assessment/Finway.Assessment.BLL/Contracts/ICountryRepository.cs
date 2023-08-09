using Finway.Assessment.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Finway.Assessment.BLL.Contracts
{
    public interface ICountryRepository
    {
        Task<IEnumerable<Country>> GetAsync(Expression<Func<Country, bool>>? filter = null);
    }
}
