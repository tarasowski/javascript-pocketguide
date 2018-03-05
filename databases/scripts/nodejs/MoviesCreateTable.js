const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-central-1',
    endpoint: 'http://localhost:8000'
})

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: 'Movies', // a new table name to create 
    KeySchema: [ // schema that needs to be provided for storage primary key and sort key
        {AttributeName: 'year', KeyType: 'HASH'},
        {AttributeName: 'title', KeyType: 'RANGE'}
    ],
    AttributeDefinitions: [
        {AttributeName: 'year', AttributeType: 'N'},
        {AttributeName: 'title', AttributeType: 'S'}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error('Unable to create table', JSON.stringify(err, null, 2));
    } else {
        console.log('Created table. Table', JSON.stringify(data, null, 2));
    }
});