using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCoreWithEF.Data.EF;
using AspNetCoreWithEF.Data.Entities;


namespace AspNetCoreWithEF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("Include_FirstOrDefault")]
        public async Task<Todo> Include_FirstOrDefault()
        {
            Console.WriteLine("_____________________Include_FirstOrDefault");
            var response = await _context.Todos.AsNoTracking()
                .Include(x => x.Owner).FirstOrDefaultAsync();

            return response;
        }
        
        [HttpGet("Include_ToList")]
        public async Task<int> Include_ToList()
        {
            Console.WriteLine("_____________________Include_ToList");
            await _context.Todos.AsNoTracking()
                .Include(x => x.Owner).ToListAsync();

            return 0;
        }

        [HttpGet("Select_FirstOrDefault")]
        public async Task<owner> Select_FirstOrDefault()
        {
            Console.WriteLine("_____________________Select_FirstOrDefault");
            var response = await _context.Todos.AsNoTracking()
                .Select(x => x.Owner).FirstOrDefaultAsync();

            return response;
        }
        
        [HttpGet("Select_ToList")]
        public async Task<int> Select_ToList()
        {
            Console.WriteLine("_____________________Select_ToList");
            await _context.Todos.AsNoTracking()
                .Select(x => x.Owner).ToListAsync();

            return 0;
        }

    }
}
