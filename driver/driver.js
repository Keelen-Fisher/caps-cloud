'use strict'
const AWS = require('aws-sdk');

// do some config
// Use CAUTION with credentials, do not add credentials to github 

// AWS.config.update({})

const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-1:324528892959:caps:869beea6-70f5-4673-bcb9-940fb2c2d49c';

// opinionated AWS requires case sensitive keys (caps in the first letter)
const payload = {
  Message: 'Here is my Message',
  TopicArn: topic,

}

sns.publish(payload, (err, data) => {

  if(err){
    console.err(err);
  }
  console.log(data)
})
