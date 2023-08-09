using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Finway.Assessment.BLL.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string entityName)
           : base($"Not Found {entityName}")
        {
        }
    }
}
