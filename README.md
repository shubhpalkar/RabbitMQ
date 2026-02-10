YouTube Video Reference -: https://www.youtube.com/watch?v=dX-3R2TH5qE&list=PLZVBmpM0E_DHlA9Fz4QznfPjUKPIz48I7&index=1

What is RabbitMQ?
A full-fledged message broker, Implements AMQP protocol, Runs as a separate server, Language-agnostic.

Producer → Exchange → Queue → Consumer

Steps to follow-:
1. npm i amqplib  //supporting package for rabbitMQ
2. docker pull rabbitmq:management      //Docker image 
3. docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
b54932caf7c803943574045a302918e110339bd362eba1d07d0f7fec841d21ef   //Run docker image with exposing port for getting UI of rabbitMQ 
