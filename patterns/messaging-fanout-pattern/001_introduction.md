# Messaging Fanout Pattern

[Messaging Fanout Pattern for Serverless Architectures Using Amazon SNS](https://aws.amazon.com/blogs/compute/messaging-fanout-pattern-for-serverless-architectures-using-amazon-sns/)

The fanout pattern for message communication can be implemented in code. However, depending on your requirements, alternative solutions exist to offload this undifferentiated responsibility from the application. Amazon SNS is a fully managed pub/sub messaging service that lets you fan out messages to large numbers of recipients.

### System-to-system messaging patterns

You can now invoke AWS Lambda functions by publishing notifications in Amazon SNS. This makes it easy to customize notifications before sending them to mobile devices or other destinations. Applications and AWS services that already send SNS notifications, such as Amazon CloudWatch, can now integrate with AWS Lambda through push notifications, without provisioning or managing infrastructure. [Source](https://aws.amazon.com/about-aws/whats-new/2015/04/amazon-sns-now-integrates-with-aws-lambda/)

As the diagram below shows, the resulting architecture is similar to the original. The exception is that objects written to S3 now trigger a message to be published to an SNS topic. This sends the S3 event to multiple Lambda functions to be processed independently.

![Fanout Messaging Architecture](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2017/07/25/messaging-fanout-for-serverless-with-sns-diagram2.png)

## What is messaging?

Messaging involves passing messages around, but it’s different from email or text messages, because it is intended for communication between software components, not between people. Enterprise messaging happens at a higher level than that of UDP packets or direct TCP connections (although it does frequently use these protocols).

A message typically contains the payload — whatever information your application sends: XML, JSON, binary data, and so on. You can also add optional attributes and metadata to a message. A SQL or NoSQL database often has a server that stores data. Similarly, a messaging server or service allows a place for your messages to be stored temporarily and transmitted.

## The queue and the topic

For a database service, the main resource is a table. In a messaging service, the two main resources are the queue and the topic. A queue is like a buffer. You can put messages into a queue, and you can retrieve messages from a queue. The software that puts messages into a queue is called a message producer and the software that retrieves messages is called a message consumer.

![Queue](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2017/05/24/MessageQueueDiagramFINAL.png)

A topic is like a broadcasting station. You can publish messages to a topic, and anyone interested in these messages can subscribe to the topic. Then, the interested parties are notified about the published messages. The software that broadcasts topics is called a topic publisher and the software that subscribes to broadcasts is called a topic subscriber.

![Topic](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2017/05/24/MessageTopicDiagramFINAL.png)

### When should you use messaging?

* Service-to-service communication: You have two services or systems that need to communicate with each other. Let’s say a website (the frontend) has to update customer’s delivery address in a customer relationship management (CRM) system (the backend). Alternatively, you can set up a load balancer in front of the backend CRM service and call its API actions directly from the frontend website. You can also set up a queue and have the frontend website code send messages to the queue and have the backend CRM service to consume them.

* Asynchronous work item backlogs: You have a service that has to track a backlog of actions to be executed. Let’s say a hotel booking system needs to cancel a booking and this process takes a long time (from a few seconds to a minute). You can execute the cancellation synchronously, but then you risk annoying the customer who has to wait for the webpage to load. You can also track all pending cancellations in your database and keep polling and executing cancellations. Alternatively, you can put a message into a queue and have the same hotel booking system consume messages from that queue and perform asynchronous cancellations.

* State change notifications: You have a service that manages some resource and other services that receive updates about changes to those resources. Let’s say an inventory tracking system tracks products stocked in a warehouse. Whenever the stock is sold out, the website must stop offering that product. Whenever the stock is close to being depleted, the purchasing system must place an order for more items. Those systems can keep querying the inventory system to learn about these changes (or even directly examine the database—yuck!). Alternatively, the inventory system can publish notifications about stock changes to a topic and any interested program can subscribe to learn about those changes.

### Key features of messaging systems

* Push or pull delivery: Most messaging services provide both options for consuming messages. Pull means continuously querying whether the messaging service has any new messages. Push means that the messaging service notifies you when a message is available.

* Dead letter queues: What can your application do if a queue contains a message that you can’t process? Most messaging services allow you to configure a dead-letter queue for messages that you fail to process a certain number of times.

* Delay queues and scheduled messages: What if you want to postpone the processing of a particular message until a specific time? Many messaging services support setting a specific delivery time for a message. If you need to have a common delay for all messages, you can set up a delay queue.

* Ordering, priorities, duplicates

**When designing your system with messaging in mind, ask yourself the following questions:**

- Do you need to process messages exactly in the order in which they were sent?
- Could your application parallelize the workload and process messages out of order?
- Do you want your application to consume certain messages at a higher priority than other messages?
- What happens if your application fails to process a message midway? Can you handle processing the same message again?

[Adding Messaging to Your Toolbox](https://aws.amazon.com/blogs/compute/building-scalable-applications-and-microservices-adding-messaging-to-your-toolbox/)
