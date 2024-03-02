require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const config = require('./config/config')
const userRoutes = require('./routes/users/userRoutes');
const droneRoutes = require('./routes/admin/droneRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');
const pilotRoutes = require('./routes/pilots/pilotRoutes');
const searchRoutes = require('./routes/users/searchRoutes');
const repairForms = require('./routes/services/repairing_formRoutes');
const sprayingForms = require('./routes/services/spraying_formRoutes');
const orders = require('./routes/users/orderRoutes');
const shoppingCart = require('./routes/users/cartRoutes');
const feedbackForm = require('./routes/users/feedbackFormRoutes');
const address = require('./routes/services/addressRoutes');
const payments = require('./routes/users/paymentRoutes')
const User = require('./models/users/userModel')
const DroneInventory = require('./models/admin/droneModel');
const Pilot = require('./models/pilots/pilotModel');
const Admin = require('./models/admin/adminModel');
const Repair_Details = require('./models/services/repairing_formModel')
const Spraying_Details = require('./models/services/spraying_formModel');
const Order = require('./models/users/ordersModel');
const ShoppingCart = require('./models/users/cartModel');
const FeedbackForm = require('./models/users/feedbackFormModel');
const Address = require('./models/services/addressModel');
// Middleware to parse JSON data
app.use(express.json());


// app.use(cors({
//   origin: ['http://localhost:3000','http://localhost:3001'],
//   credentials: true
// }));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

const allowedOrigins = ['http://localhost:3000','http://localhost:3001' ]; // Add your React app's origin(s)

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (e.g., cookies, authorization headers)
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

User.createTable()
DroneInventory.createTable()
Pilot.createTable()
Admin.createTable()
Repair_Details.createTable()
Spraying_Details.createTable()
Order.createOrdersTable()
ShoppingCart.createShoppingCartTable()
FeedbackForm.createFeedbackFormTable()
Address.createAddressesTable()

// Routes
app.use('/users', userRoutes);
app.use('/drones', droneRoutes);
app.use('/pilots', pilotRoutes);
app.use('/admin', adminRoutes);
app.use('/search', searchRoutes);
app.use('/repair_form', repairForms)
app.use('/spraying_form', sprayingForms)
app.use('/order', orders)
app.use('/cart', shoppingCart)
app.use('/feebackForm', feedbackForm)
app.use('/address', address)
app.use('/payments', payments)
// Start the server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
