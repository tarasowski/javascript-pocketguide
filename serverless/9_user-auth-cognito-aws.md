# User Authentification - AWS Cognito

In our API Gateway the Method Request acts as a kind of a gatekeeper. It can validate the body, can check for authorization and can require an API key. 

In the API Gateway you can choose the option for authorization it's called Authorizers. There you can define the authorization rules for your API. 

## Customer Authorizer

A custom authorizer uses Lambda behind the scenes. It does tell the API Gateway to call a specific Lambda function, to pass some data/information from the incoming request to the function and that function then has to run some code to validate to authenticate the user. In this function you can chan the jwt token, setup your own authentificatio workflow. 

The goal fot the Lambda function is to return the AIM policy back to us. The policy needs to decide are you a user that makes a request, are you allowed to invoke this API endpoint. The policy will be generated dynamically and it will expire after a certain time, but before doing so it will grant/deny the access.

```js
{
    "Effect": "Allow",
    "Action": "execute-ap"
}
```
Also it will return an ID of the user

```js
Return Principal ID (User Id)
```

**Note:** For custom authorization we can use jwt token as a service.

## Cognito Adding Authentication

AWS gives us a working service to sign users up, reset passwords, authenticate users, generate the tokens and the whole verificitaton process. It can be integrated with other providers Google, Facebook, Linkedin. For instance we have an application and Cognito defines how to authenticate users and issues authentication tokens that are stored on user devices.

**Note:** Cognito also can issue temporary AIM credentials so you can access depending on certain roles.

[Cognito](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/aws-cognito.png)