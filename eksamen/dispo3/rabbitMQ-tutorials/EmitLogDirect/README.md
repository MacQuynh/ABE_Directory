docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

commands for emitLogs Direct and receivelogs Direct

-   ReceiveLogsDirect
    cd ReceiveLogsDirect

    dotnet run info warning error

-   EmitLogsDirect
    cd EmitLogDirect
    dotnet run error "Run. Run. Or it will explode."

for emitlogs og receivelogs
cd Receivelogs
dotnet run

cd Emitlogs
dotnet run

command for Topics

to Receive all the logs:

-   cd ReceiveLogsTopic
-   dotnet run "#"

To receive all logs from the facility "kern":

-   cd ReceiveLogsTopic
-   dotnet run "kern.\*"

to hear only about "critical" logs:

-   cd ReceiveLogsTopic
-   dotnet run "\*.critical"

You can create multiple bindings:

-   cd ReceiveLogsTopic
-   dotnet run "kern._" "_.critical"

to emit a log with a routing key "kern.critical" type:

-   cd EmitLogTopic
-   dotnet run "kern.critical" "A critical kernel error"
