
const express = require("express");

const Order = require("../../services/users/orderService");
const Address = require("../../models/services/addressModel");
const Product = require("../../models/admin/droneModel");
const verifyToken = require('../../middleware/verifyToken');


require('dotenv').config();

const stripe =  require("stripe")(process.env.STRIPE_API_KEY)

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body.cartItems);
 console.log(req.body.selectedAddress);
 console.log(req.body.user);
  const customer = await stripe.customers.create({
    name : req.body.user,
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
    metadata: {
      userId : req.body.user_id,
      cart: JSON.stringify(req.body.cartItems),
      selectedAddressId: req.body.selectedAddress,
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    // Check if droneDetails exists and has the expected properties
    const droneName = item.drone_name;
    const droneId = item.drone_id
    const cartID = item.CartID;
    const price = item.price * 100; // Convert Price to float and multiply by 100 for cents
    const quantity = item.quantity;
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: droneName, //|| "Unknown Drone", // Use a default name if droneName is undefined
          metadata: {
            id: cartID, //|| "Unknown ID", // Use a default ID if cartID is undefined
          },
        },
        unit_amount: price, //|| 0, // Use 0 as default price if price is undefined
      },
      quantity: quantity, //|| 1, // Use 1 as default quantity if quantity is undefined
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    payment_method_types:["card"],
    customer: customer.id,
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  // Return the session URL to the client
  res.send({ url: session.url });
});

// Webhook endpoint to handle the event when payment is successful or fails
// router.use(bodyParser.raw({ type: 'application/json' }));

router.post("/webhook", express.raw({ type: 'application/json' }),async (req, res) => {
  let data;
  let eventType;

  // Check if webhook signing is configured.
  let webhookSecret;
  //  webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data.object;
   
  } else {
    // retrieve the event data directly from the request body.
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the payment_intent.succeeded event
  if (eventType === "charge.succeeded") {
    stripe.customers.retrieve(data.customer).then(async (customer) => {
      try {
        createOrder(customer, data, "paid");
      } catch (err) {
        console.log(err);
      }
    }).catch((err) => console.log(err.message));
  }

  // Handle the payment_intent.payment_failed event
  if (eventType === "payment_intent.payment_failed") {
    stripe.customers.retrieve(data.customer).then(async (customer) => {
      try {
        createOrder(customer, data, "failed");
      } catch (err) {
        console.log(err);
      }
    }).catch((err) => console.log(err.message));
  }

  res.status(200).end();
});


const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);
  const address_id = customer.metadata.selectedAddressId;
  const selectedAddress = await Address.getAddressById(address_id );
  console.log(Items,"this to see the items")
  console.log(selectedAddress)
  const products = await Promise.all(
    Items.map(async (item) => {
      const drone_id = item.drone_id
      const product = await Product.getDroneById(drone_id );
      console.log(product)
      return {
        userId: item.user_id,
        productId: item.drone_id,
        quantity: item.quantity,
        unit_price: item.price ,
      };
    })
  );
console.log(products,"This is to check details in pducts")
  const totalAmount = products.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );
  
console.log("This to know the total amount:",totalAmount)
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;



console.log(formattedDate);
const ordersPromises = products.map(async (product) => {

      const newOrder = {
          UserID: product.userId,
          ProductID: product.productId,
          UserName: customer.name,
          OrderQuantity: product.quantity,
          TotalAmount: product.quantity * product.unit_price,
          OrderDate: formattedDate,
          AddressType: selectedAddress.address_type,
          RecipientName: selectedAddress.recipient_name,
          StreetAddress: selectedAddress.street_address,
          City: selectedAddress.city,
          State: selectedAddress.state,
          PostalCode: selectedAddress.postal_code,
          ReceiptUrl: data.receipt_url,
          PaymentStatus: data.status,
          TransactionId: data.payment_intent,
      };
      await Order.createOrder(newOrder);
      console.log("Processed Order:", newOrder);
  
});
await Promise.all(ordersPromises);

};

module.exports = router;