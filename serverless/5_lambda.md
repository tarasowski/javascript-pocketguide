# What is AWS Lambda

Lambda is a sevice which allows you to host your code on it and run it upon certain events. 

Lambda is a high-scale, provision-free serverless compute offering based on functions. It provides the cloud logic layer for your application. Lambda functions can be triggered by a variety of events that occur on AWS or on supporting third-party services. They enable you to build **reactive, event-driven systems.** When there are multiple, simultaneous events to respond to, Lambda simply runs more copies of the function in parallel. [Source](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)

We have different event sources:
* S3 (e.g. file gets uploaded): a file upload could trigger a Lambda function that it can transform it e.g. resize, analyse
* Cloudwatch (scheduled): basically like a cronjob trigger a new Lambda execution every x minutes useful for clean up etc.
* API Gateway (HTTP Request): you can run the code whenever a request hits the API Gateway
There are also many other event sources.

An example event source is API Gateway, which can invoke a Lambda function anytime an API method created with API Gateway receives an HTTPS request. Another example is Amazon SNS, which has the ability to invoke a Lambda function anytime a new message is posted to an SNS topic. Many event source options can trigger your Lambda function. For the full list, see this
documentation.10 Lambda also provides a RESTful service API, which includes the ability to directly invoke a Lambda function.11 You can use this API to execute your code directly without configuring another event source. [Source](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)

Here you can find the list of the event sources that can trigger AWS Lambda [link](https://docs.aws.amazon.com/lambda/latest/dg/invoking-lambda-function.html) OR you can invoke Lambda manually through their API [link](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html)

We want to focus on API Gateway. An HTTP request triggers our code next and this code is stored in Lambda and is written in Node.JS, Python, Java or C# (C Sharp). And when the code gets executed you can do any calculation interacting with other AWS services, like store/fetch data, send mails and at the end you will return a response or execute the callback and indicate that this function is done.

![AWS Lambda](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/aws-lambda.png)

**Note:** In conjunction with API Gateway, where we have different resources and methods (get, post, delete), we can trigger different Lambda functions. 

### There are three arguments in the function:
* event: simply receives the event data and it depend on the event source what this will be. In the case of API Gateway this is configured by us, we can define which data we want to pass to Lambda.
* context: gives the information about the execution context, like the time it started, remaining time etc.
* callback: is a function itself that we do execute, which takes two arguments:
    + the first one is the error argument if it's null the function succeeded
    + the second is the data we want to pass back (if there will be an error the second argument will be omitted)

```js
exports.handler = (event, context, callback) => {
    // TODO
    callback(null, 'success');
};
```
## Handler

The handler defines the entry point what actually gets executed when this function gets called (`export.handler`). If we would simply add a function these would be a valid code, but it will be not called. The function that is going to be called is a method on the `exports` object. On that object we register a property name `handler`. It can have different names, we just need to register the function on that `exports` object. 

In the handler field `index.handler` the `index` refers to the overall code to the whole code in the Lambda and `handler` refers to the function we export in that code which gets executed once this Lambda function is triggered.

**Note:** When we upload a file we than need a file name index.js because this will be targeted by this index part and if you have a different file name you have to rename this index part too

## Role

All AWS services by default have no permissions. And Lambda needs to be allowed to do some things if you plan of using other AWS services. If we plan to access a database, you need to give this function a permission to do so. 

## How to import a Lambda function

1) Create a root entry file + handler method. For example an index.js  file with the exports.handler = (event, ...) => { ... }  method.

If you use a different file name AND/OR different starting handler function, you'll need to adjust your Lambda config! Set Handler to [FILENAME].[HANDLER-FUNCTION-NAME]  (default: index.handler).

2) You may split your code over multiple files and import them into the root file via require('file-path') . This is also how you could include other third-party JavaScript (or other languages) packages.

3) Select all files and then zip them into an archive. Important: DON'T put them into a folder and zip the folder. This will not work!

4) Upload the created zip file to Lambda ("Code" => "Code entry type" => "Upload a .ZIP file")

**Note:** CORS headers needs to be sent on each method and not only on the "preflight" options method.

# Introduction to Lambda by AWS 

[Source](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)

## The Handler

When a Lambda function is invoked, code execution begins at what is called the handler. The handler is a function that you have created and included in your package. You specify the handler when creating a Lambda function.

```js
exports.handlerName = function(event, context, callback) {
 ...
 // callback parameter is optional
}
```

Once the handler is successfully invoked inside your Lambda function, the runtime environment belongs to the code you've written. Your Lambda function if free to execute any logic you see fit, driven by the code you have written that starts in the handler. This means your handler can call other methods and functions within the files and classes you have uploaded. 

Your code can import third-party libraries that you have uploaded and install and execute native binaries that you have uploaded (as long as they can run on Amazon Linux). It can also interact with other AWS services or make API request to web services that it depends on, etc. 

## Excerpt: Creating a Deployment Package (Node.js)

To create a Lambda function you first create a Lambda function deployment package, a .zip file consisting of your code and any dependencies.

* Advanced scenario – If you are writing code that uses other resources, such as a graphics library for image processing, or you want to use the AWS CLI instead of the console, you need to first create the Lambda function deployment package, and then use the console or the CLI to upload the package.

**Note:** After you create a deployment package, you may either upload it directly or upload the .zip file first to an Amazon S3 bucket in the same AWS region where you want to create the Lambda function, and then specify the bucket name and object key name when you create the Lambda function using the console or the AWS CLI.

[Source](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html)

## The Event Object

When your function is invoked in one of the supported languages, one of the parameters provided to your handler function is an event object. The event differs in structure and contents, depending on which event source created it. The contents of the event parameter includes all of the data and metadata your Lambda function needs to drive its logic. For example, an event created by API Gateway will contain details related to the HTTPS request that was made by the API client (for example path, query string, body), whereas an event created by S3 when a new object is created will include details about the bucket and the new object. 

## The Context Object

Your Lambda function is also provided with the context object. The context object allows your function code to interact with the Lambda execution environment. The content and structure of the object vary, based on the language runtime your Lambda function is using, but at minimum it will contain:

* AWS RequestID: used to track specific of a Lambda function (important for error reporting)
* Remaining time: the amount of time in ms that remain before your function timeout occurs
* Logging: each language runtime provides the ability to stream log statements to Amazon CloudWatch Logs. The context object contains information about which CloudWatch Logs stream your log statements will be sent to. 

## Lambda Function Event Sources

Lambda provides an Invoke API [link](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html) it should be used for testing and operational purposes. Also there are many event sources that are AWS internally and can be used to invoke Lambda function if an event occurs. 

### Invokation Pattern

There are two models for invoking a Lambda function:

* Push Model: Your Lambda function is invoked every time a specific event occurs within another AWS service (for example, a new object is added to S3 bucket).
* Pull Model: Lambda polls a data source and invokes your function with any new record that arrive at the data source, batching new records together in a single function invocation (for example new records in an Amazon Kinesis or Amazon DynamoDB stream).

Also a Lambda function can be executed synchronously or asynchronously. You choose this using the parameter InvocationType that's provided when invoking the Lambda function. This parameter has three possible values:

1. RequestResponse - Execute synchronously
2. Event - Execut asynchronously
3. DryRun - Test that the invocation is permitted for the caller, but don't execute the function. 

**Note:** Each event source dictates how your function should be invoked. The event source is also responsible for crafting its own event parameter. The full list of the event sources and their definition you can find [here](https://docs.aws.amazon.com/lambda/latest/dg/invoking-lambda-function.html) Also you can find here a better visualization of the event sources and the attributes [click here](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)
