# Outlook

Some other intersting stuff.

## Documentation to the API

You can create documentation from the backend of the AWS API Gateway. Also Swagger can be used to create documentation. Swagger file can be uploaded too.

## Lambda Triggers

There are many triggers like Cloudwatch events that can schedule the function to run every 30m. Or DynamoDB that can trigger a Lambda function to react to the database events. Kinesis to listen to streams of incoming data. S3 to listen to file upload and file changes in the specific buckets. 

## Multi-Page Applications (Node.js/Express)

Run serverless applications and REST APIs using your existing Node.js application framework, on top of AWS Lambda and Amazon API Gateway [Serverless Express](https://github.com/awslabs/aws-serverless-express)

This is a helper package which wraps the express application which you can then server on Lambda to get the normal express application handled by Lamba. 

Lambda functions are stateless. It's executing for a max. time and after the execution the environment will be shut down by AWS. 

**Pros**
Pay for what you use
No infrastructure to manage
Auto-scaling with no configuration needed
Usage Plans
Caching
Authorization
Staging
SDK Generation
API Monitoring
Request Validation
Documentation

**Cons**
For apps that may not see traffic for several minutes at a time, you could see cold starts
Cannot use native libraries (aka Addons) unless you package your app on an EC2 machine running Amazon Linux
Stateless only
API Gateway has a timeout of 30 seconds, and Lambda has a maximum execution time of 5 minutes.

[Going Serverless: Migrating an Express Application to Amazon API Gateway and AWS Lambda](https://aws.amazon.com/blogs/compute/going-serverless-migrating-an-express-application-to-amazon-api-gateway-and-aws-lambda/)

**Note:** For building an API it makes a lot of sense to use the serverless approach. For other things it may not be the right approach to go. 

## Security

Differnt types of protection we need to think about:

* Application-Related: 
    + Unauthenticated Access to the API (protect w/ Cognito/Auth)
    + Restric API usage with API Keys to control who is allowd and how many fetches
    + Retrieve user data carefully (cognito uses ssl)
* Infrastructure related:
    + DDoS Attacks: if someone flud the APi with requests. The API is throttling rate is 10000 request per seconds, if you     assign usage key they will protect it too.
    + NoSQL Injection: If we access DynamoDb through the SDK, protection is built-in
    + Stolen AWS Credentials: use MFA to avoid this

## Scaling Development/Deployment process

Serverless is your toolkit for deploying and operating serverless architectures. Focus on your application, not your infrastructure. [Serverless Framework](https://serverless.com/)

There is also another alternative: AWS SAM AWS Serverless Application Model (AWS SAM) prescribes rules for expressing Serverless applications on AWS. [Github](https://github.com/awslabs/serverless-application-model) The advantage of it is it uses Clodformation, where you can write all your infrastructure in code which resources you need and configure it as you want. You can write one template which brings up everything your application needs. In comparison to Serverless framework from above where you only can manage Lambda + API Gateway. 

[Deploying Lambda Functions (with SAM and even automated!):](https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html)

## Testing Application | LocalStack - A fully functional local AWS cloud stack

A fully functional local AWS cloud stack. Develop and test your cloud apps offline! [Link](https://localstack.cloud)
All the services that AWS provide are existing here in this framework as a dummy endpoints so we can locally test the services on the local machines. And the LocalStack project from Atlassian does exactly this. LocalStack offers AWS services in a mock version. For instance you want to test if the Lambda is working correctly you would put e.g. try to make a command putItem() into the DynamoDB and it will return a mock answer...

API Gateway at http://localhost:4567
Kinesis at http://localhost:4568
DynamoDB at http://localhost:4569
DynamoDB Streams at http://localhost:4570
Elasticsearch at http://localhost:4571
S3 at http://localhost:4572
Firehose at http://localhost:4573
Lambda at http://localhost:4574
SNS at http://localhost:4575
SQS at http://localhost:4576
Redshift at http://localhost:4577
ES (Elasticsearch Service) at http://localhost:4578
SES at http://localhost:4579
Route53 at http://localhost:4580
CloudFormation at http://localhost:4581
CloudWatch at http://localhost:4582
SSM at http://localhost:4583

Another framework that offers a lighter version is [Serverless Offline](https://github.com/dherault/serverless-offline)

## Other Services

- AWS SES Send Emails Service
- AWS SQS Message Queues: For decouple the microservices (pull approach instead of a push appraoch)
- AWS Step Functions can orchestrace the Lambda functions
