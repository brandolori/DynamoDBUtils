import dynamodb from "aws-sdk/clients/dynamodb.js"
import aws from "aws-sdk"
import fs from "fs"
const { DocumentClient } = dynamodb;

if (process.argv.length < 3) {
    console.log("Missing required table name")
    process.exit(1)
}

const tableName = process.argv[2]

aws.config.update({ region: "eu-south-1" })

const client = new DocumentClient()

const response = await client.scan({
    TableName: tableName,
}).promise()

const string = JSON.stringify(response.Items)

console.log(`Writing ${response.Items.length} items to file`)

fs.writeFileSync(`${tableName}-output.json`, string)
