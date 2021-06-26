using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Polly;

namespace ProjectA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectAController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ProjectAController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> SomeAction()
        {
            int retryCount = 0;
            var client = _httpClientFactory.CreateClient("CatalogService");
            
            var retryPolicy = Policy
                .Handle<HttpRequestException>()
                .WaitAndRetryAsync(new[]
                {
                    TimeSpan.FromSeconds(2),
                    TimeSpan.FromSeconds(4),
                    TimeSpan.FromSeconds(8)
                });

            try
            {
                await retryPolicy.ExecuteAsync(async () =>
                {
                    Console.WriteLine("Retry " + retryCount);
                    retryCount++;
                    var response = await client.GetStringAsync("/home");
                });
            }
            catch (Exception e)
            {
                throw new Exception("", e);
            }

            return Ok();
        }
    }
}
