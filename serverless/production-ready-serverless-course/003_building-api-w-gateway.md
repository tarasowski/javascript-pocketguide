# Building API with API Gateway and Lambda

API Gateway is not JSON only. As you see in most of the demos outthere. In general we don't need to host our Html site on s3, we can use protocol buffers with API Gateway and Lambda. You can read more here about how to use other formats [Using Protocol Buffers with API Gateway and AWS Lambda](https://hackernoon.com/using-protocol-buffers-with-api-gateway-and-aws-lambda-22c3804f3e76)

AWS announced binary support for API Gateway in late 2016, which opened up the door for you to use more efficient binary formats such as Google’s Protocol Buffers and Apache Thrift.

**Note:** PRO TIP - take advantage of container reuse to avoid laoding static content, or creating DB connection pools on every invocation. Since HTML is static it makes no sense to load it on every invokation and if the container for our function is reused we would still have our global variables on the next invokation. We can optimize it here by caching html after the first invokation. Global variables can persist from one invokation to another a good optimization is to use them to store static configurations, database connections etc. which is something that AWS Lambda team recommend. 

```js
let html; // for caching static content and not to load it on every invokation

function* loadHtml() {
  if (!html) {
    html = yield fs.readFileAsync('./static/index.html', 'utf-8');
  }
  return html;
}

module.exports.handler = co.wrap(function* (event, context, callback) {
  let html = yield loadHtml();
  const response = {
    statusCode: 200,
    body: html,
    headers: {
      'Content-type': 'text/html; charset=UTF-8'
    }
  };

  callback(null, response);

});
``` 

You can use libraries to make async/await and Promises working in Node6.10 (the current version of Node at AWS Lambda), just include following libraries:

```js
const co = require('co');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
``` 

## How to secure APIs in API Gateway

You can have APIs that needs authentification (POST, DELETE etc.) and APIs that don't need any authentication such as (GET). But it always depends on the service/app. 

``` 
GET big-mouth.com (no authentication)
POST big-mouth.com/sigin (no authentication)
POST big-mouth.com/profile (needs authentication)
POST big-mouth.com/orders (needs authentication) > GET big-mouth.com/restaurants (internal API)
``` 

You can also have internal APIs that will not be consumed by the client directly. In a micro-services architecture these APIs are often used to encapsulate a set of shared resources information about restaurants is a shared resource that many part of the system need access it. In microservices architecture these shared resourse will be maintaned by a dedicated servive a restaurant api for example. The only way to retrieve or update information about restaurants is by interacting with this API. As these internal APIs can be very powerful and can be used to update or even delete system state, so they must be well protected.

For instance the `DELETE big-mouth.com/restaurants/{name}` endpoint can be part of the system. And you wouldn't want to be this endpoint public, so that an attacker can easily delete all the restaurant from your system. Typically we restric the access to this internal APIs using combination of private VPCs and Authorization Headers. Wit API Gateway we loose the ability to create network network bindaries for private VPCs but in return we get multiple access control mechanism out of the box owned and maintained at the API Gateway level. 

## Configure API Key

1. One of the way to secure API Gateway is to use API keys. In order to create API keys we need to log into API Gateway console and create first of all an usage plan, after that add a user and under Method Request switch API Key Required to `true`. Once the endpoint is protected by the API key you need to add API key header `x-api-key` to the request.

You can find detailed description in this video [Yan Cui API Keys](https://livevideo.manning.com/module/38_2_4/production-ready-serverless/building-api-with-api-gateway-and-lambda/how-to-secure-apis-in-api-gateway)

**Note:** you don't need to do it by hand, you can also use serverless framework as well. You can read more here [Setting API Keys](https://serverless.com/framework/docs/providers/aws/events/apigateway/#setting-api-keys-for-your-rest-api) 

### API Keys + usage plans:

* are designed for rate limiting, not authentication & authorization
* allows client to access selected APIs at agreed upon request rates and quotas
* request reate and quota apply to all APIs and stages covered by the usage plan

## Authorization AWS_IAM

If your goal is to restrict access to endpoints using role based permission model for example to allows internal API only be accesssible only by your own services then you should use AWS_IAM authorization instead. 

## Custom Authorizers

Another way to restict the access to the API is via Custom Authorizers. You can create new Authorizers in the Amazon management console. You can click on Authorizers in your API (API Gateway Frontend). Here you can use a Lambda or a Cognito service for Authorization. 

### Custom Authorizer Cognito

What is Cognito: Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. Amazon Cognito scales to millions of users and supports sign-in with social identity providers, such as Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0.

![Cognito AWS](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-cognito.jpeg)

### Custom Authorizer Function

When a client makes request to the API Gatway, then API Gateway will invoke this custom authorization function which will return a JSON payload with a policy object (principal) for this user or it will reject the request and send a 403 error back to the client. For successfully authenticated request the policy will be cached for future request. The API Gateway will forward the request to configured endpoint that invokes the Lambda function. 

[HTTP Endpoints with Custom Authorizers](https://serverless.com/framework/docs/providers/aws/events/apigateway/#http-endpoints-with-custom-authorizers)

## Recap

* If you need to limit for individual callers you can use API Keys + Usage Plans
* If you need authorization & authentication
    + You can offload them to AIM for internal services
    + You want to offload task to Cognito you should use Cognito User Pools instead
        + If you want to write a Lambda function to implement the authentication / authorization then you have also API Gateway Custom Authorizer Function that returns a policy. 
    + You can implement this logic inside endpoint itself!

In most cases Authorization/Authentication happens at the API Gateway Level. If any request fails it does not invoke the Lambda function for the endpoint so you want pay for that invokation either, which is much more expensive than Lambda invokations. 

![Cognito AWS](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-recap-authorization.png)

## How to secure APIs

Internal APIs should be secured via IAM authorization or if it's a user we can use Cognito Identity Pools.

![Securing APIs](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-secure-api.png)



