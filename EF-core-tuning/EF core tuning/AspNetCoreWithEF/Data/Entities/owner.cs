using System.ComponentModel.DataAnnotations;

namespace AspNetCoreWithEF.Data.Entities
{
    public class owner
    {
        [Key]
        public string Name { get; set; }
    }
}