# What is AWS Lambda

Lambda is a sevice which allows you to host your code on it and run it upon certain events. 

We have different event sources:
* S3 (e.g. file gets uploaded): a file upload could trigger a Lambda function that it can transform it e.g. resize, analyse
* Cloudwatch (scheduled): basically like a cronjob trigger a new Lambda execution every x minutes useful for clean up etc.
* API Gateway (HTTP Request): you can run the code whenever a request hits the API Gateway
There are also many other event sources.

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

