<template>
  <div class="home">
    <form>
    <input v-model="price" type="text">
    <button @click="makePayment">GO</button>
    </form>


  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'home',
  components: {
    
  },
  data(){
    return{
      price:0
    }
  },
  methods:{



    // Initializing the payment request
    makePayment:function(){

      // 1. GENERATE ORDER_ID using razorpay/order api
      axios.post('https://us-central1-paytm-payments-f3957.cloudfunctions.net/paymentApi/',{
        amount:this.price
      })
      .then((res)=>{
        var rzp1 = new Razorpay({...options,order_id:res.data.id});
        rzp1.open();
      })
      .catch((err)=>{console.log("ERR",err)});
      
      
      //  create options object when creating order

      var options = {
        key: "---razorpay key -----",
        amount: "59900", /// The amount is shown in currency subunits. Actual amount is ₹599.
        name: "Formec Media",
        currency: "INR", // Optional. Same as the Order currency
        description: "Purchase Description",
        image: "https://jolly-volhard-bc2f0b.netlify.com/favicon.ico",
        handler:  (response) =>{
          this.verifySignature(response);
        },
        prefill: {
            name: "Rohan Lamb",
            email: "lambrohan@gmail.com"
        },
        notes: {
            address: "Hello World"
        },
        theme: {
            color: "#00ffff"
        }
      };
      

    },
    verifySignature:function(response){
      axios.post('https://us-central1-paytm-payments-f3957.cloudfunctions.net/paymentApi/confirmPayment'
      ,response
      )
      .then((res)=>{console.log("PAYMENT RESPONSE",res)})
      .catch((err)=>{console.log('error')})
    }
  }
}
</script>

<style scoped>
input{
  border: 1px solid rgb(0, 217, 255);
  padding:8px 40px;
  text-align: center;
}
button{
  background: rgb(0, 241, 161);
  border: none;
  padding: 8px 30px;
  margin: 16px;
}
</style>

