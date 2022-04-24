const addOrderDetails = async (req, res) => {
    try {
        const order_id = req.body.order_id
        const orderDetails = req.body.orderDetails;
        console.log("🚀 ~ file: orderDetails.controller.js ~ line 5 ~ addOrderDetails ~ orderDetails", orderDetails)
        for (let i = 0; i < orderDetails.length; i++) {
            models.orderDetails.create({
                order_id: order_id,
                product_id: orderDetails[i].product_id,
                quantity: orderDetails[i].quantity,
                total_price: orderDetails[i].total_price,
            }).then(result => {

            }).catch(err => {
                throw err;
            })
        }
        return res.status(200).send({
            error: false,
            success: true,
            message: "Order Details Added Successfully"
        })
    } catch (err) {
        return res.status(err.code | 500).send({
            error: true,
            success: false,
            message: "Error Occur While Adding Order Detail"
        })
    }
}

const getOrderDetails = (req, res) => {
    const orderId = req.params.id;

    con.query('SELECT od.id as orderDetailID,od.product_id,od.quantity,od.total_price, p.name,p.price FROM bill AS o, orderDetails AS od, products AS p WHERE o.id = od.order_id AND od.product_id = p.id AND o.id = ?', orderId, (err, result) => {
        if (err) {
            errorResponse(res, error, "Error While Fetching Records");
        }
        return successResponse(res, result, "Order Details Fetched Successfully");
    })
}

module.exports = {
    addOrderDetails,
    getOrderDetails,
}