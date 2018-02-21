# API Gateway

With API Gateway we can create Restfull APIs. This is how a Restfull API works:

We a web app, a mobile app or some other client that is reaching to our API (like Postman). These clients will send a request to some backend to perform some CRUD Operations also to the API. It can be created with Node.js/PHP/Java or any other languages. Where you write the whole code for providing API endpoints (URLs) where the clients could connect on your own. 

API Gateway is a service by AWS which makes much easier, where you don't have to write any code where you can convinietnly create API in an interface. We can create endpoints here which is a combination of resources/paths and http methods (get, post etc.). You can also implement authentication with the API Gateway. With API Gateway you can directly access other AWS services such as Lambda to trigger some action (e.g. to run Lambda function). 

![Serverless API Gateway](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/aws-api-gateway.png)

# API Keys

If you plan to create an API that is shared with other developers so not with users of the app, with other developers creating their own apps. Like Mailchimp, Sendgrind, Stripe APIs if you use them you need to send the API key with every request you send to the API, because you identify yourself with that key and companies can track also the usage of the API and possiblty limit the usage. We can do the same with the API Gateway. 

If we generate the API the customer can send this key along with the request to indentify himself. Why? We can e.g. block request that aren't sending an API key. We can setup usage plans to restric usage for certain keys. This is what we can do with the API key and the usage plan. It's only important if you want to work with other developers. 

**Note:** Client certificate is important if you plan on forwarding incoming request to another http endpoint and that another http endpoint want to validate that the request for this endpoint comes from a API Gateway API. 

A resource is just like a path `/xyz` If you create a new resource you create a new path in the url you use. 

In the AWS console we can create API resources/methods but they are not live on the web. When we want to make it live we need to deploy the API, by doing so we create a snapshot of our API and it gets shipped to the web. We can have also different stages (dev, test, prod) and different version (v1, v2) of the API.

## Authorizers

Authorizers allows us to add authentication to the API. When you have specific paths which should only be accessible by specific Users (or logged in), you can define this authentification logic the tool or the code you want to use for these users here. 

## Models

Models allow us to shape the data with we work in with our API. It's optional and models are created by using the JSON schema language, you can define you the actuals JSON data should be structured. If you use these models here you can use it to validate incoming data, see if it fits that schema reject if its not etc. 

## Documentation

Is also important if you plan to expose the API to other developers. You can document and make sure that people know how to use your API.

## How to setup an API

In the first example we created an API endpoint `/first-api-test`. It's an endpoint we can hit with the request. Because an endpoint is made up of two things:
    1. A path to which the request should send 
    2. And the type of the request (GET, POST, PUT, PATCH, DELETE)

As soon as we hit an endpoint we go through a cycle. It depicts the flow of data in our API. We have a client which sends a request. 

1. Method request: how the incoming request is handled by the API Gateway. And how request reaching this endpoint should look like, it's like a gatekeeper. We can reject request if it don't fit a certain schema. Authorization: NONE, Request Validator NONE (query paramenters, JSON schema, request body), API Key Required False

2. Integration request: is about mapping incoming data / transforming incoming data on the action we want to trigger. In the example we are triggering a mock endpoint which is not doing anything. But there are options like triggering Lambda function, another HTTP endpoint or any other AWS Services. The role of the integration request is to trigger an endpoint and if we want transform our incoming request data (body, headers), it allows us to extract the data and pass it to the endpoint.

3. Integration response: it gets first triggered as soon as our action is done. If we use e.g. Lambda it will give us a result of some calculation or anything like that. Integration response allows us to configure the response we are sending back. We can have different response that we are define, success/error response etc. We can also transform our data here too, we get back our data from action endpoint e.g. Lambda and we want to send the data back in a certain structure to the client. So we can add some transformation here. 

4. Method response: defines the shape of our response. The shape our response should have. Here what we can do simply configure possible responses that we are sending back. We can define headers and type of data we want to send back (response body). It's not binding we cannot block the response even if there is an error or so. 

![API cycle](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/aws-api-cycle.png)






