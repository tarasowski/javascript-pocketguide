'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-central-1',
    endpoint: 'http://172.16.123.1:8000'
})

const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {

    const table = 'Movies';
    const year = 2015;
    const title = 'The Big New Movie';
    
    const params = {
        TableName: table,
        Key: {
            "year": year,
            "title": title
        }
    };
// here is the solution https://github.com/awslabs/aws-sam-local/issues/102
    docClient.get(params, (err, data) => {
        if (err) {
            console.error('Unable to read item. Error JSON', JSON.stringify(err, null, 2));
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(data)
            })
        }
    });

}