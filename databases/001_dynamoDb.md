# DynamoDb - Amazon AWS

### KeySchema

Specifies the attributes that make up the primary key for a table or an index. The attributes in KeySchema must also be defined in the AttributeDefinitions array. For more information, see Data Model in the Amazon DynamoDB Developer Guide.

Each KeySchemaElement in the array is composed of:

AttributeName - The name of this key attribute.

KeyType - The role that the key attribute will assume:

HASH - partition key

RANGE - sort key

```js
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
``` 

### AttributeDefinitions
An array of attributes that describe the key schema for the table and indexes.

**Note:** Each regions needs to have their own tables etc. If you are trying to write to a Table in another AWS regions you will simply get an error message:

```json
Unable to add item. Error JSON: {
  "message": "Cannot do operations on a non-existent table",
  "code": "ResourceNotFoundException",
  "time": "2018-03-04T12:41:03.021Z",
  "requestId": "44e4a28a-fbc7-40d0-968b-6edc3c23bb0e",
  "statusCode": 400,
  "retryable": false,
  "retryDelay": 18.113983295099644
}
``` 