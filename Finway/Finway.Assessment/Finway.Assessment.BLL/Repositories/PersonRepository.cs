using Finway.Assessment.BLL.Contracts;
using Finway.Assessment.BLL.Exceptions;
using Finway.Assessment.DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq.Expressions;


namespace Finway.Assessment.BLL.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly FinwayAssessmentDbContext context;
        private readonly DbSet<Person> dbSet;

        public PersonRepository(FinwayAssessmentDbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<Person>();
        }

        public async Task<Person> CreateAsync(Person person)
        {
            var insertResult = await context.People.AddAsync(person);
            return insertResult.Entity;
        }

        public async Task<Person> DeleteAsync(int id)
        {
            var person = await context.People.Where(u => u.Id == id).FirstOrDefaultAsync();
            if (person == null) throw new NotFoundException("Person not found");
            person.IsDeleted = true;
            context.Entry<Person>(person).State = EntityState.Modified;
            return person;

        }

        public async Task<IQueryable<Person>> GetAsync(Expression<Func<Person, bool>>? filter = null)
        {
            IQueryable<Person> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await Task.FromResult(query);
        }

        public async Task<Person> GetByIdAsync(int id, string? includeProperties = null)
        {
            var person = await context.People.Where(u => u.Id == id).FirstOrDefaultAsync();
            if (person == null) throw new NotFoundException("Person not found");
            return person;

        }

        public async Task<int> SaveChangesAsync()
        {
            return await context.SaveChangesAsync();
        }

        public async Task<Person> UpdateAsync(Person entity)
        {
            var person = await context.People.Where(u => u.Id == entity.Id).FirstOrDefaultAsync();
            if (person == null) throw new NotFoundException("Person not found");
            person.Name = entity.Name;
            person.Email = entity.Email;
            person.DateOfBirh = entity.DateOfBirh;
            entity.CountryId = entity.CountryId;
            context.Entry<Person>(person).State = EntityState.Modified;
            return person;
        }
    }
}
