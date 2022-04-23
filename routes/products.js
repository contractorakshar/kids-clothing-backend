var express = require('express');
const productsController = require('../controllers/products.controller');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {

        const filename = Date.now();
        cb(null, filename + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.get('/all-products', productsController.getAllProducts);

router.get('/product-details/:id', productsController.getProductById);

router.post('/add-product', upload.single('cover_image'), productsController.addProduct);

router.delete('/delete-product-soft/:id', productsController.softDeleteProduct);

router.delete('/delete-product-hard/:id', productsController.hardDeleteProduct)

router.put('/update-product/:id', productsController.updateProduct);

router.get('/all-products-count', productsController.getAllProductsCount);

router.get('/all-products-category-count', productsController.getAllProductsCategoryCount);

module.exports = router;