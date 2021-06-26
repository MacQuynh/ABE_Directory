using System;
using RabbitMQ.Client;
using System.Text;
using System.Linq;

namespace EmitLogDirect
{
    class EmitLogDirect
    {
        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                // create Exchange
                channel.ExchangeDeclare(exchange: "direct_logs", ExchangeType.Direct);

                var severity = (args.Length > 0) ? args[0] : "info";

                var message = (args.Length > 1) ? string.Join(" ", args.Skip(1).ToArray()) : "Hello World!";

                var body = Encoding.UTF8.GetBytes(message);

                channel.BasicPublish(
                    exchange: "direct_logs",
                    routingKey: severity,    // supply the log severity as a routing key. That way the receiving script will be able to select the severity it wants to receive.
                    basicProperties: null,
                    body: body
                );

                Console.WriteLine(" [x] Sent '{0}':'{1}'", severity, message);
            }

            Console.WriteLine(" Press [enter] to exit.");
            Console.ReadLine();
        }

    }
}
