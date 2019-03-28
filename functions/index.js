const functions = require('firebase-functions');
var express = require('express');
var cors = require('cors');
var request = require('request');
const crypto = require('crypto');
const key = '----insert yout key here----';
const key_secret = '----- insert key secret here ----';


var app = express();

app.use(cors({origin:true}));

app.post("/",(req,res)=>{
  const amount = req.body.amount;
  var options = { method: 'POST',
    url: 'https://api.razorpay.com/v1/orders',
    headers: 
    {
      Authorization: 'Basic' + new Buffer(key + ":" + key_secret).toString("base64")},
    form: 
    { amount: amount,
      currency: 'INR',
      receipt: '----- create a order in firestore and pass order_unique id here ---',
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