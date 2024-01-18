
const express = require('express');
// const stripe = require('stripe')('');
// const uuid = require('uuid/v4');
const router = express.Router();


router.get('/',(req, res) => {
    res.send("IT WORKS FINE")
})


module.exports = router;