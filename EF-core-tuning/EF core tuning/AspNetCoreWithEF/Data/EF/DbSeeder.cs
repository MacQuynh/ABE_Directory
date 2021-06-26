using AspNetCoreWithEF.Data.Entities;
using System.Collections.Generic;
using System.Linq;


namespace AspNetCoreWithEF.Data.EF
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Todos.Any())
            {

                List<Todo> todos = new List<Todo>();
                
                bool temp = false; 
                
                for (int i = 0; i < 10000; i++)
                {
                    if (i % 2 == 1)
                    {
                        temp = true;
                    }

                    var tempOwner = new owner {Name = $"{i}"};
                    context.Owners.Add(tempOwner);
                    todos.Add(new Todo()
                    {
                        Description="test a", 
                        IsClosed=temp, 
                        chores = $"chores{i}", 
                        time = i, 
                        Owner = tempOwner
                    });

                    temp = false;
                }

                context.Todos.AddRange(todos);
                context.SaveChanges();
            }
        }
    }
}
