var express = require('express');
const { addBillDetails, getBillDetails, getAllBillDetails } = require('../controllers/order.controller');
var router = express.Router();

router.post('/add_bill_details', addBillDetails);

router.get('/get_bill_details/:id',getBillDetails);

router.get('/get_all_bill_details',getAllBillDetails);

module.exports = router;