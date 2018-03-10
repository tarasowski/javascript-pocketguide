'use strict';
const AWS = require('aws-sdk');
const axios = require('axios');

AWS.config.update({
    region: 'eu-central-1',
    endpoint: 'http://172.16.123.1:8000'
})


const docClient = new AWS.DynamoDB.DocumentClient();

const generateResponse = (status, data) => {
    return {
        "statusCode": status,
        "body": JSON.stringify(data)
    }
}


exports.get = (event, context, callback) => {
    // carrying add here to make it more readable
    const table = process.env.TABLE_NAME_DEV;
    const name = event.pathParameters.projectName;
    console.log(`Strating to get the data from the database for ${name}`);

    if (name === 'all') {
        const params = {
            TableName: table
        }
        docClient.scan(params, (err, data) => {
            if (err) {
                const response = generateResponse(400, err);
                console.error(err);
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
                name
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
    const link = JSON.parse(event.body).link;
    console.log('Starting to write data to database:', link);
    
    axios.get(link).then(res => {
        console.log(`The ${link} is working with a status code: ${res.status}`)
        const params = {
            TableName: table,
            Item: {
                name,
                link,
                timestamp: new Date().toISOString()
            }
        };
        docClient.put(params, (err, data) => {
            if (err) {
                const response = generateResponse(400, err);
                callback(response, null);
            } else {
                const response = generateResponse(200, data);
                callback(null, {
                    "statusCode": 200,
                    "body": "urls is working and saved to db"
                });
            }
        })


    }, err => {
        console.log(`The ${link} is NOT working`)
        const response = generateResponse(400, "this url doesnt exists");
        console.log(response);
        callback(null, {
            "statusCode": 409,
            "body": "Url is not working - Conflict, please re-submit the URL"
        });
    })
    .catch(err => console.log(err));
    
};

exports.delete = (event, context, callback) => {
    const table = process.env.TABLE_NAME_DEV;
    const name = event.pathParameters.projectName;
    const params = {
        TableName: table,
        Key: {
            name
        }
    };

    console.log(`Deleting ${name} form the database`);

    docClient.delete(params, (err, data) => {
        if (err) {
            const response = createResponse(400, err);
            callback(response, null);
        } else {
            const response = createResponse(200, data);
            callback(null, response);
        }
    });
};

