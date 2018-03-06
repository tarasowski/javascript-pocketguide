'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-central-1',
    endpoint: 'http://172.16.123.1:8000'
})

const docClient = new AWS.DynamoDB.DocumentClient();

const generateResponse = (status, data) => {
    return {
        statusCode: status,
        body: JSON.stringify(data, null, 2)
    }
}

exports.get = (event, context, callback) => {

    const table = process.env.TABLE_NAME_DEV;
    const name = event.pathParameters.projectName;
    console.log('Print', name);
    
    if (name === 'all') {
        const params = {
            TableName: table
        }
        docClient.scan(params, (err, data) => {
            if (err) {
                const response = generateResponse(400, err);
                callback(response, null);
            } else {
                const response = generateResponse(200, data);
                callback(null, response);
            }
        })
    } else {
        const params = {
            TableName: table,
            Key: {
                name: name
            }
        };
    // here is the solution for the Problem with Docker https://github.com/awslabs/aws-sam-local/issues/102
        docClient.get(params, (err, data) => {
            if (err) {
                const response = generateResponse(400, err);
                callback(response, null);
            } else {
                const response = generateResponse(200, data);
                callback(null, response);
            }
        });
    }

   

}

exports.post = (event, context, callback) => {
    const table = process.env.TABLE_NAME_DEV;
    const name = event.pathParameters.projectName;
    const payload = event.body;
    console.log(JSON.parse(payload).link);
    const params = {
        TableName: table,
        Item: {
            name: name,
            link: JSON.parse(payload).link,
            timestamp: new Date().toISOString()
        }
    };
    console.log(`Adding a new item: ${name}`);

    docClient.put(params, (err, data) => {
        if (err) {
            const response = generateResponse(400, err);
            callback(response, null);
        } else {
            const response = generateResponse(200, data);
            callback(null, response);
        }
    })
};