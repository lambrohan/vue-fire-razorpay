const functions = require('firebase-functions');
var express = require('express');
var cors = require('cors');
var request = require('request');
const crypto = require('crypto');
const key = 'HxkooJ7iPrWlWvzXxmIbM5xD';


var app = express();

app.use(cors());

// app.options('/', function (req, res) {
//   console.log("Options request")
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.status(200);
//   res.end();
// });

app.post("/",(req,res)=>{
  const amount = req.body.amount;
  console.log("AMOUNT",amount);
  var options = { method: 'POST',
    url: 'https://api.razorpay.com/v1/orders',
    headers: 
    {
      Authorization: 'Basic cnpwX3Rlc3RfZ2FaaWt6b2poVGRtT3Y6SHhrb29KN2lQcldsV3Z6WHhtSWJNNXhE' },
    form: 
    { amount: amount,
      currency: 'INR',
      receipt: 'Receipt 123',
      payment_capture : 1
    } 
    };

  request(options, function (error, response, body) {
      if (error) throw new Error(error);
     
      res.send(body);
      

    });
})

app.post('/confirmPayment',(req,res)=>{
  const order = req.body;
  const text =order.razorpay_order_id+ "|" +order.razorpay_payment_id;
  var signature = crypto.createHmac('sha256',key).update(text).digest('hex');

  if(signature === order.razorpay_signature){
    console.log("PAYMENT SUCCESSFULL")
    
    res.send("PAYMENT SUCCESSFULL")
  }else{
    res.send("something went wrong!");
    res.end();
  }

})






exports.paymentApi = functions.https.onRequest(app);