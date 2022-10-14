'use strict';
const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');

AWS.config.update({region: 'us-west-1'});

const message = process.argv[2];

const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-1:324528892959:caps';

const payload = {
  Message: message,
  TopicArn: topic,
}

sns.publish(payload).promise()
  .then(data => console.log(data))
  .catch(err => console.log(err));

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/324528892959/vendorConfirmed.fifo',
  handleMessage: (data) => {
    let body = JSON.parse(data.Body);
    console.log('message Received: ', body);
  }
});

app.start();


