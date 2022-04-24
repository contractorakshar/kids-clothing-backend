var express = require('express');
const { addOrderDetails, getOrderDetails } = require('../controllers/orderDetails.controller');
var router = express.Router();


router.post('/add_order_details', addOrderDetails)

router.get('/get-order-details/:id', getOrderDetails);
module.exports = router;