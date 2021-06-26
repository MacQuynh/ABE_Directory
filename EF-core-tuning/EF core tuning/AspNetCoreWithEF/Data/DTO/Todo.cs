using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWithEF.Data.DTO
{
    public class TodoRequest
    {
        public string Description { get; set; }
        public bool IsClosed { get; set; }
        public string chores { get; set; }
        public double time { get; set; }
    }
}
