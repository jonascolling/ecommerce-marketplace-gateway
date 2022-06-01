const AWS = require('aws-sdk');
const SQS = new AWS.SQS();

exports.handler = async function(event) {
  
  AWS.config.update({region: 'us-east-1'});
  
  const content = JSON.parse(event.body);
  
  console.log('Received event:', content);

  const queueURL = "https://sqs.us-east-1.amazonaws.com/695586982593/ecommerce_marketplacein_" + content.channel; 

  console.log('SQS Queue:', queueURL);
  
  const message = {
    MessageBody: content.message,
    QueueUrl: queueURL
  };
  
  console.log('Message:', message);
  
  try {
    const data = await SQS.sendMessage(message).promise();
    console.log('Success: MesssageId ', data.MessageId);
    return {"messageId": data.MessageId};
  } 
  catch(error) {
    console.log('Error:', "Fail to send message " + error);
    throw new Error("[InternalServerError] " + error);
  }

};
