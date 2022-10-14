'use strict'

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');
const Chance = require('chance');
const chance = new Chance();

const producer = Producer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/324528892959/lab19Queue',
  region: 'us-west-1'
});


async function driver(data){
  let message = '';
  try{
    let body = JSON.parse(data.Body)
    message = body.Message
    console.log(message);
  } catch (e){
    console.log('incorrect output', e.message);
  }

  let stringMessage = JSON.stringify(message);

  let payload = {
    id: 'id',
    body: stringMessage,
    groupId: 'CodeFellowsGroup',
    deduplcationId: chance.postal(),
  }

  try {
    let response = await producer.send(payload);
    console.log(response);
  }
  catch (e){
    console.log(e);
  }
}

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/324528892959/lab19Confirmation',
  handleMessage: driver
});


app.start();
