using System;
using System.Collections.Generic;

namespace Finway.Assessment.DAL;

public partial class Person
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public DateTime? DateOfBirh { get; set; }

    public int? CountryId { get; set; }

    public bool? IsDeleted { get; set; }

    public virtual Country? Country { get; set; }
    public string? Image { get; set; }

}

