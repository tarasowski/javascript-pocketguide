# What is DynamoDB

DanymoDB is a fully managed NOSQL database provided by AWS. With NOSQL there are no relations in the database. This is super important. In MYSQL you would have multiple tables which you could connect to each other, you can set a relation. In NOSQL the different tables in the database stay for their own. 

## Why is DynamoDB a good fit for serverless architecture?

Because it's fully managed and you don't have to spinup any database servers. There are no server clusters behind it, instead there are couple of solid state drives which stores your data. Again it's about hosted DB on AWS.

## Data Model?

The date format for the DynamoDB has a key/value pairs, just like JSON/JS Object. There are no any schemas! One important things that needs to be present is the ID of the entry, but besides that you can store whatever you want in one storage. It's transactional manner of NOSQL and makes it interesting for large sets of data, because of the flexibility. 

## How to organise the data in DynamoDB?

In a DynamoDB in the table we are always required to have a partition key. Then you can have as many attributes as you need, but that partition key is a must. We can use for a partition key e.g. a user id, but we need to tell DynamoDB that is the partition key. The special thing about the partition key it has to be unique, it has to have unique values. 

**Fact:** Why is it named partition key? That's related to the DynamoDB how it stores the data behind the scenes. It uses a fleet of solid state drives and it tries to store the data efficiently by partitioning these state drives. To put in to very simple example, it stores it by letters from A to Z (A, B, C, D, E, F, G...), but if the partition key stars with A it's going to be in the A partition, if it starts with C it could be in the C partition. Back to the user id if the first user has A1, A2, A3 etc. that would probably sit in the A partition. For very efficient distribution which makes accessing the data as fast as possible, you should aim to split the data among many partitions. It would be good to have random partition keys, so user 1 has A5, user 2 has C6 and user 3 has D8...

## Primary Key?

Primary key is by which the data is identified and can be queried, sometimes to have a single attribute could be a good identifier, instead we want to have a combination of two: partition key + sort key. The DynamoDB gives us the opportunity to do so. The sort key is a timestamp. In the example we would have as a partition key the user id but sometimes we will have the same data since the user e.g. with the same id can be doing any things. In order to have it unique we can use the sort key (timestamp) to create unique primary keys for data management.

## Global Secondary Index? 

But even sometimes these combination is not enough. For instance I want to query the first name, for this reason we can setup a global secondary index, this can be setup explicitly and you can setup 5 of this per table this forces DynamoDB to manage this attribute in kind of special way and more optimal way and it makes quering much more efficient and it allows also to query this secondary index.

## Local Secondary Index?

If you want to use a combination of primary key (user id + timestamp) and an attribute you can also setup a local secondary index. And all these features give a lot of flexibility to query the data.

**Note:** Often we'll work only with the combination of primary key and sometimes with a global secondary index. The key takeaway is that DynamoDB is very flexible and gives many options for structuring the data and then quering the data.

![DynamoDb](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/aws-dynamodb-keys.png)



