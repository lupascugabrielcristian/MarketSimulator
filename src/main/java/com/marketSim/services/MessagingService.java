package com.marketSim.services;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessagingService implements IMessagingService{

    @Autowired
    RabbitTemplate template;

    @Override
    public void sendMessage(String message) {
//        ConnectionFactory factory = new CachingConnectionFactory("localhost", 5673);
//
//        // set up the queue, exchange, binding on the broker
//        RabbitAdmin admin = new RabbitAdmin(factory);
//        Queue queue = new Queue("myQueue");
//        TopicExchange exchange = new TopicExchange("myExchange");

//        System.out.println("Components created.");

//        admin.declareQueue(queue);
//        admin.declareExchange(exchange);
//        admin.declareBinding(BindingBuilder.bind(queue).to(exchange).with("foo.*"));
//        System.out.println("Declaration and binding done");

        // send something
//        RabbitTemplate template = new RabbitTemplate(factory);
        template.convertAndSend("queue", message + "_QUEUE");

//        template.convertAndSend("queue2", message + " on q2");
        System.out.println("Message sent " + message);
    }
}
