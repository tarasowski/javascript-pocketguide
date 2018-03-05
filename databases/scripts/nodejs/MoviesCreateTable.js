const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-central-1',
    endpoint: 'http://localhost:8000'
})

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: 'Movies',
    KeySchema: [
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