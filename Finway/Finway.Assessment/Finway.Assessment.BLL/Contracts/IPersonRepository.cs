using Finway.Assessment.DAL;
using System;
using System.Linq.Expressions;

namespace Finway.Assessment.BLL.Contracts
{
    public interface IPersonRepository
    {
        Task<IQueryable<Person>> GetAsync(
           Expression<Func<Person, bool>>? filter = null);
        Task<Person> GetByIdAsync(int id, string? includeProperties = null);
        Task<Person> CreateAsync(Person entity);
        Task<Person> UpdateAsync(Person entity);
        Task<Person> DeleteAsync(int id);
        Task<int> SaveChangesAsync();
    }
}
