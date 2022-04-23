const sequelize = require("sequelize");
const { successResponse, errorResponse } = require("../helpers/response.helper");


const getAllProducts = (req, res) => {
    models.category.belongsTo(models.products);
    models.products.hasOne(models.category);

    models.products.findAll({
        attributes: ['id', 'category_id', 'name', 'manufacturer', 'color', 'price', 'cover_image', 'description','quantity'],
        include: {
            model: models.category,
            attributes: ['name', 'id'],
            required: true,
            on: [{
                category_id: sequelize.where(sequelize.col('category.id'), '=', sequelize.col('products.category_id'))
            }],
        },
        where: {
            is_deleted: 0
        }
    }).then(result => {
        return successResponse(res, result, "All Products Fetched Successfully");
    }).catch(err => {
        return errorResponse(res, err, "Error While Fetching Products!");
    })

}

const getProductById = (req, res) => {
    const id = req.params.id;

    models.category.belongsTo(models.products);
    models.products.hasOne(models.category);

    models.products.findOne({
        attributes: ['id', 'category_id', 'name', 'manufacturer', 'color', 'price', 'cover_image', 'description','quantity'],
        include: {
            model: models.category,
            attributes: ['name', 'id'],
            required: true,
            on: [{
                category_id: sequelize.where(sequelize.col('category.id'), '=', sequelize.col('products.category_id'))
            }],
        },
        where: {
            id,
            is_deleted: 0
        }
    }).then(result => {
        return successResponse(res, result, "Product Details Fetched Successfully");
    }).catch(err => {
        return errorResponse(res, err, "Error While Fetching Product Details!")
    })

}

const addProduct = (req, res) => {

    const productDetails = req.body;
    productDetails.cover_image = req.file.filename;
    models.products.create({
        category_id: productDetails.category_id,
        name: productDetails.name,
        manufacturer: productDetails.manufacturer,
        color: productDetails.color,
        price: productDetails.price,
        cover_image: productDetails.cover_image,
        description: productDetails.description,
        quantity:productDetails.quantity,
    }).then((result) => {
        console.log("🚀 ~ file: products.controller.js ~ line 75 ~ addProduct ~ result", result)
        return successResponse(res, result, "Product Details Added Successfully");
    }).catch((err) => {
        console.log("🚀 ~ file: products.controller.js ~ line 75 ~ addProduct ~ err", err)
        return errorResponse(res, err, "Error While Adding Product Details!");
    });
}

const softDeleteProduct = (req, res) => {

    const id = req.params.id;

    models.products.update({
        is_deleted: 1,
    }, {
        where: { id }
    }).then(result => {
        return successResponse(res, result, "Product Deleted Successfully");
    }).catch(err => {
        return errorResponse(res, err, "Error While deleting Products!");
    });
}

const hardDeleteProduct = (req, res) => {

    const id = req.params.id;

    models.products.destroy({
        where: {
            id
        }
    }).then(result => {
        successResponse(res, result, "Category Deleted SuccessFully");
    }).catch(err => {
        errorResponse(res, err, "Error While Deleting Category");
    })
}

const updateProduct = (req, res) => {

    const productDetails = req.body;
    const id = req.params.id;
    models.products.update({
        category_id: productDetails.category_id,
        name: productDetails.name,
        manufacturer: productDetails.manufacturer,
        color: productDetails.color,
        price: productDetails.price,
        cover_image: productDetails.cover_image,
        description: productDetails.description,
    }, {
        where: { id }
    }).then(result => {
        successResponse(res, result, "Product Updated Successfully");
    }).catch(err => {
        errorResponse(res, err, "Error While Updating Product");
    })
}


const getAllProductsCount = (req, res) => {
    models.products.count({
        where: {
            is_deleted: 0
        },
    }).then(result => {
        return successResponse(res, result, "Products Count");
    }).catch(err => {
        return errorResponse(res, err, "Error While Fetching Products!");
    })
}

const getAllProductsCategoryCount = (req, res) => {
    models.category.belongsTo(models.products);
    models.products.hasOne(models.category);

    models.products.count({
        include: {
            model: models.category,
            attributes: ['name', 'id'],
            required: true,
            on: [{
                category_id: sequelize.where(sequelize.col('category.id'), '=', sequelize.col('products.category_id'))
            }],
        },
        where: {
            is_deleted: 0
        },
        group: ["category_id"],
    }).then(result => {
        return successResponse(res, result, "Category wise Products Count");
    }).catch(err => {
        return errorResponse(res, err, "Error While Fetching Products!");
    })
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    softDeleteProduct,
    hardDeleteProduct,
    updateProduct,
    getAllProductsCount,
    getAllProductsCategoryCount
}
