var express = require('express');
var router = express.Router();
const productPhotosController = require('../controllers/productsPhotos.controller')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/productPhotos')
    },
    filename: function (req, file, cb) {

        const filename = Date.now();
        cb(null, filename + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post('/app-product-photos/:id', upload.array('product-photos'), productPhotosController.addProductPhotos);

router.get('/get-product-photos/:id', productPhotosController.getProductPhotosById);

module.exports = router;