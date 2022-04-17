const { errorResponse, successResponse } = require("../helpers/response.helper");

const addProductPhotos = async (req, res, next) => {
    try {
        const productId = req.params.id;
        if (req.files.length) {
            for (let i = 0; i < req.files.length; i++) {
                models.productPhotos.create({
                    product_id: productId,
                    photo_url: req.files[i].filename
                }).then(result => {
                    // console.log(result);
                }).catch(err => {
                    // console.log(err);
                    throw err;
                })
            }
        }
        return res.status(200).send({
            error: false,
            success: true,
            message: "Product Photos Added Successfully"
        })
    } catch (err) {
        return res.status(500).send({
            error: true,
            success: false,
            message: "Error Occur While Adding Product Photos"
        })
    }

}

const getProductPhotosById = async (req, res) => {
    const id = req.params.id;
    con.query('SELECT photos.id,photos.photo_url,photos.product_id FROM products p, productPhotos photos WHERE p.id = photos.product_id AND p.id = ?', id, (err, result) => {
        if (err) {
            errorResponse(res, error, "Error While Fetching Records");
        }
        return successResponse(res, result, "Product Details Fetched Successfully");
    })
}
module.exports = {
    addProductPhotos,
    getProductPhotosById
}