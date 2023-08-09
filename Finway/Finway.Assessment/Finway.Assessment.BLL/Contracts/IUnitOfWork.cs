using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Finway.Assessment.BLL.Contracts
{
    public interface IUnitOfWork 
    {
        ICountryRepository CountryRepository { get; }
        IPersonRepository PersonRepository { get; }
        Task<int> Save();
    }
}
