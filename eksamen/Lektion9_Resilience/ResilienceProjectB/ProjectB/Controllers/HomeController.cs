using System;
using System.Net.Sockets;
using Microsoft.AspNetCore.Mvc;
using Polly.Contrib.Simmy;
using Polly.Contrib.Simmy.Outcomes;

namespace ProjectB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : Controller
    {
        // GET: HomeController
        [HttpGet]
        public string GetProjectBResult()
        {
            //Using Simmy to create faults:
            var fault = new SocketException(errorCode: 10013);
            var chaosPolicy = MonkeyPolicy.InjectException(with =>
                with.Fault(fault)
                    .InjectionRate(0.5)
                    .Enabled()
            );
            
            chaosPolicy.Execute(chaosMethod);

            return "This is project B";
        }

        private void chaosMethod()
        {
            Console.Write("This is the chaosMethod()");
        }
    }
}
