# Getting Started w/ Serverless Computing on AWS

https://www.udemy.com/aws-serverless-a-complete-introduction/learn/v4/t/lecture/7275232?start=0

## What's AWS?

AWS allows you to rent their infrastructure to run your application. Cloud hosting (EC2) is under Compute on aws.amazon.com, Storage (S3)

## What's Serverless?

For most of the app we need a backend a restfull API where apps can access to exchange data on that backend (access database,business logic). The best use case for serverless where you have decoupled the backend and frontend. The backend needs to run on a server EC2 where we run our virtual machine. If the application grows and needs to scale up we need more and more servers to handle incoming traffic. But this approach has a couple of issues. We need to reinvent the wheel, we need to write the logic request, we need to define the API endpoints, we have to do a lot of infrastructure things. Additionally we need to think about how many servers we need and they are all the time online. And we need to keep the severs updates etc.

When we use serverless apps, we don't manage all these servers, instead we use AWS Lambda. Lambda allows us to host our code which is executed on demand when it needs to run, we don't think about how many servers we need, and to manage them. Also the API logic is already built in into the Lambda too.

We can use node.js, python etc. when using Lambda it gives us the possibility to use serverless APIs. But there is a still limited support for the fullstack apps. Right now there is support for node.js/express and is tricky to setup. 

## API Gateway

The API Gateway in AWS let's us create API endpoints (not programatically) like in node/express where we need to define the routes and endpoints. We can create an API simply from the web browser inside AWS console.

