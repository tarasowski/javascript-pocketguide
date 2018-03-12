# Development Steps

[Source](https://app.pluralsight.com/player?course=aws-nodejs-serverless-framework-using&author=fernando-medina&name=714bb110-cd3f-407b-a764-749b4c9f2595&clip=6&mode=live)

1. Setup and dependencies
2. Configuration settings
3. Write function code
4. Deploy and test your application

## Starting a Project
You start to create a new service from a template provided by Serverless framework.

1. Create a Serverless Framework service from a template
serverless create --template aws-nodejs --path servicename

2. Install any Node.js dependencies
npm init -y && npm install your-dependencies

## Configuration of YAML

```yaml
# serverless.yml
service: woofGardenService

provider:
    name: aws
    runtime: nodejs6.10

function:
    Emailer:
        handler: handler.woofGardenEmailer
        description: Emails reminder
    events: 
        - schedule:
            rate: rate(3 days)
``` 

## Deployment Options

* serverless deploy (we can run this command): this command will deploy or update the entire application. You need to run this specific command if you first time deploy your service. 
* serlverless deploy function --function Emailer: once we have deployed our service we can run only this command, that will speed up the deployment process and will only deploy the function (case sensitive). 
* serverless deploy --package package-path: you can use this command to specify particular package (mostly reserved for integration for continious integration - CI and continious deployment pipelines)
* serverless remove: command can remove the service

How does the serverless deployment works:

1. Serverless.yml: the framework reviews the serverless yml file first
2. Crates a Cloudformation template from that file: API, Databases or other resources required for the service
3. Zips up the code and dependencies and sends to S3
4. Function will be created by Cloudformation from the Zip packages that were stored in S3
5. If everything is finished Serverless will display the output of the template

### Testing

1. Look ahead - Write testable function code (not testable Lambda function, the code can be deployed everwhere)
2. Separate business logic and IaaS - specific code
3. Unit test for business logic and integration tests with other services