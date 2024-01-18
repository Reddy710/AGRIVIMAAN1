const express = require('express');
const app = express();
const cors = require('cors')
const config = require('./config/config')
const userRoutes = require('./routes/userRoutes');
const droneRoutes = require('./routes/droneRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pilotRoutes = require('./routes/pilotRoutes');
const searchRoutes = require('./routes/searchRoutes');
const repairForms = require('./routes/repairing_formRoutes');
const sprayingForms = require('./routes/spraying_formRoutes');
const orders = require('./routes/orderRoutes');
const shoppingCart = require('./routes/cartRoutes');
const feedbackForm = require('./routes/feedbackFormRoutes');
const address = require('./routes/addressRoutes');
const payments = require('./routes/paymentRoutes')
const User = require('./models/userModel')
const DroneInventory = require('./models/droneModel');
const Pilot = require('./models/pilotModel');
const Admin = require('./models/adminModel');
const Repair_Details = require('./models/repairing_formModel')
const Spraying_Details = require('./models/spraying_formModel');
const Order = require('./models/ordersModel');
const ShoppingCart = require('./models/cartModel');
const FeedbackForm = require('./models/feedbackFormModel');
const Address = require('./models/addressModel');
// Middleware to parse JSON data
app.use(express.json());
app.use(cors())

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
