# User authentication - AWS Cognito

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

![Cognito](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-cognito.png)

### Cognito Options

* Manage your user pools: is the complete solution for people who have no authentication process at all and don't want to use 3rd party providers like Facebook and Google, they get user pools where users can signup/signin. 

* Manage federated identities: allow to connect 3rd party providers like Facebook, Google, to then create temporary AIM credentials to issue these users with the rights of performing certain actions depending on which credentials you have provided e.g. to provide to upload files on S3 bucket. 

**Note:** By default users are identified with username and password. But we can also have additional attributes that we can choose for user authentication. If we want to allow to use email insted of a user name we need to check the alias options. By doing so each email needs to be unique and can be checked by Cognito. 

Also it has already built-in functionality of Multi-Factor-authentication (MFA) that can be activated if needed. Another option is to enable phone number verification. 

**Note:** If your app is running in the browser you have to disable **Generate client secret**. Because there in JS you cannot protect this secret. The signup will work diferent and we can't set this up. 

## Full Authentication Flow (User Pools)

1. We have our user and user is using our application and through that application he is signing up to our user pool. 
2. In the user pool a new user is created and stored in the database, we don't have to manage that database, everything is done by Amazon Cognito. Then the confirmation promt goes directly to the user (email or sms). 
3. User receives a confirmation, user confirms the registration then the account is confirmed. Once it's confirmed it can be used for signing up. The whole confirmation thing can be skipped, but for making sure that emails actually reach someone it's a good thing to include it 
4. With the confirmed account we can authenticate so we sign in to the user pool and there we validate if the combination of email or password is valid and can be found in the database.
5. Once this happens Cognito issues a couple of tokens to our frontend application, no matter if it's JS, Android or iOS app. We get 3 tokens:
    + Identity Token: this token we are sending to our backend (API Gateway) to authenticate request and work with it.
    + Access Token: can be used to send to Cognito if we want to change some attributes
    + Refersh Token: the refresh token is required to get new identity and access tokens, because they are only living 1h. It's a security measure since the tokens can be stolen, so they don't live that long. The refresh tokens gets a new token by singin us in without requiring email and password again.

![Auth Flow](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-auth-flow.png)

