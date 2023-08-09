using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Finway.Assessment.DAL;

public partial class FinwayAssessmentDbContext : IdentityDbContext<IdentityUser>
{
    public FinwayAssessmentDbContext()
    {
    }

    public FinwayAssessmentDbContext(DbContextOptions<FinwayAssessmentDbContext> options)
        : base(options)
    {
    }

   
    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Person> People { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Country>().HasData(
            new Country { Id = 1, Name ="Egypt" },
            new Country { Id = 2, Name= "Australia" },
            new Country { Id = 3, Name= "Angola" },
            new Country { Id = 4, Name = "Argentina" },
            new Country { Id = 5, Name = "Algeria" },
            new Country { Id = 6, Name = "Albania" }
        );
        base.OnModelCreating(modelBuilder);
    }

}
