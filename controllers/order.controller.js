const addBillDetails = (req, res) => {

    const billDetails = req.body;

    models.bill.create({
        email_id: billDetails.email_id,
        order_date: billDetails.order_date,
        payment_method: billDetails.payment_method,
        remark: billDetails.remark,
        amount: billDetails.amount
    }).then(result => {
        console.log("🚀 ~ file: order.controller.js ~ line 11 ~ result", result)
        return successResponse(res, result, "Bill Details Successfully Added");
    }).catch(err => {
        return errorResponse(res, err, "Error While Adding Bill Details");
    })
}

const getBillDetails = (req, res) => {
    const orderId = req.params.id;
    models.bill.findOne({
        where: {
            id: orderId
        }
    }).then(result => {
        return successResponse(res, result, "Bill Details Fetched Successfully");
    }).catch(err => {
        return errorResponse(res, err, "Error While Fetching Bill Details!")
    })
}

const getAllBillDetails = (req,res)=>{
    models.bill.findAll({}).then(result => {
        return successResponse(res, result, "All Bill Detail Fetched Successfully");
    }).catch(err => {
        return errorResponse(res, err, "Error While Fetching Bill Detail!");
    })

    
}
module.exports = {
    addBillDetails,
    getBillDetails,
    getAllBillDetails,
}