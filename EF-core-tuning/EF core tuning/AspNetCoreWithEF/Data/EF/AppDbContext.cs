using AspNetCoreWithEF.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Logging;

namespace AspNetCoreWithEF.Data.EF
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> o) : base(o) { }
        public virtual DbSet<Todo> Todos { get; set; }
        public virtual DbSet<owner> Owners { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine, (eventId, logLevel) => logLevel >= LogLevel.Trace);
        }
    }
}
