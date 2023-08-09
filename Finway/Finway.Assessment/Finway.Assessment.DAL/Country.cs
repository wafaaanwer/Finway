using System;
using System.Collections.Generic;

namespace Finway.Assessment.DAL;

public partial class Country
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Person> People { get; set; } = new List<Person>();
}
