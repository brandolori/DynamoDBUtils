import dynamodb from "aws-sdk/clients/dynamodb.js"
import aws from "aws-sdk"
import fs from "fs"
const { DocumentClient } = dynamodb;

if (process.argv.length < 4) {
    console.log("Missing required parameters: <input-file> <table-name>")
    process.exit(1)
}

const inputFile = process.argv[2]
const tableName = process.argv[3]

aws.config.update({ region: "eu-south-1" })

const string = fs.readFileSync(inputFile)

const items = JSON.parse(string)

const client = new DocumentClient()

items.forEach(async (el, index) => {
    await client.put({
        TableName: tableName,
        Item: el
    }).promise()
    console.log(`Wrote item number ${index}`)
});




