var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

const  sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queueURL = "https://sqs.us-east-2.amazonaws.com/940283106912/dvr-containerization-poc";
const paramsWrite = {
  MessageAttributes: {
    "Title": {
      DataType: "String",
      StringValue: "Message"
    }
  },
  MessageBody: "Queue information",
  QueueUrl: queueURL
};
const paramsRead = {
  AttributeNames: [
     "SentTimestamp"
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
     "All"
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
 };


function writeToQueue() {
  let x = 0
  console.log("Write to the queue")
  while(true){
    NumQueueMessages = "formula"

    for(let i = 0; i < NumQueueMessages; i++){
      sqs.sendMessage(paramsWrite, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log(`Success from version ${process.env.VERSION}`, data.MessageId);
        }
      });
    }
    // sleep
    x += 1
  }





}

function readFromQueue() {
  while(true){
    console.log("Write to the queue")
    console.log(`Sleep for ${parseInt(process.env.WRITE_SPEED)}`)


    sqs.receiveMessage(paramsRead, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
        var deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, function(err, data) {
          if (err) {
            console.log("Delete Error", err);
          } else {
            console.log("Message Deleted", data);
          }
        });
      }
    })
    // sleep()
  }
  




}

if(process.env.MODE == "WRITE"){
  writeToQueue()
} else {
  readFromQueue()
}


