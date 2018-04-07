# Notes

# Cognito User Pools vs. Federated Identity Pools

While working on the authenticationa and authorization service for Claudia CRM. I faced many issues and different solutions. Cognito is one of the most confusing services of Amazong that I've met so far. Let's dive in and explain how to use this service in clear and concise way.

There are many tutorials online and many videos, but they are not very concise. Often lot of different use cases are mixed within one tutorial. In this post I'm going to explain following cases:

1. Adding sign-up and sign-in functionality to your app (email + password) w/o (facebook, google, twitter)
    + Cogntio User Pool: You have an API (Api Gateway) and you want to make some resources private. So only registered users can make API calls to specific HTTP methods and resources behind them. If you don't want to use other 3rd party services for authentication (facebook, twitter, google etc.). If you only want to stick with Cognito User Pools (a user pool is simply just a record of registered users that are able to log-in and access your private resources). 

2. Adding sing-up and sign-in functionality to your app (email + password) and other services such as facebook, google, twitter
    + Federated Identity Pool: With federated identity user can sign-in and sign-up with social networks such as facebook, twitter, google and many other provider. Federated identity gives you the possiblity to get access to internal AWS resources from your app. That means you're having private resources and you want to access them e.g. with your facebook or twitter credentials. Federated identity grants access to internal resources through IAM roles (very important, you'll see it later)

## What is Amazon Cognito User Pool

The AWs Cognito User Pools give you the possibility easily to integrate sing-up and sing-in functionality in your mobile or web app. It's a fully managed service by AWS, you don't need to care about the security, protocols and other stuff. 

Amazon Cognito Pricing looks as follow:

Pricing Tier (MAUs)	Price per MAU
Next 50,000	$0.00550
Next 900,000	$0.00460
Next 9,000,000	$0.00325
Greater than 10,000,000	$0.00250


**Important:** In your API Gateway you need to add as Authorizer your Cognito User Pool. Also you need to add to your HTTP request method "Authorization": Cognito 
    







[Managing Identity and Securing Your Mobile and Web Applications with Amazon Cognito](https://www.youtube.com/watch?v=ruo-1XT9xVU)

* Authentication: 
    + Sign in users
    + Enable federation with enterprise identities
    + Enable federation with social media identitites
* Authorization:
    + Protect data and operations
    + Provide fine-grained control
* User Management:
    + Manage user lifecycles
    + Store and manage user profile data
    + Monitor engagement



---

# Live Coding - Cognito React App

[Live Coding with AWS: API Authentication with Amazon Cognito](https://www.youtube.com/watch?v=TowcW1aTDqE&t=5913s)



* [Amazon Cognito Identity SDK for JavaScript](https://github.com/aws/aws-amplify/tree/master/packages/amazon-cognito-identity-js)
* [Summary and useful links](https://gist.github.com/jfaerman/abc31d2fefca6701e87a9e3a9e885c18)
* [Breakless App Example](https://github.com/jfaerman/breakless)
