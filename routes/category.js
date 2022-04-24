var express = require('express');
const { successResponse, errorResponse } = require('../helpers/response.helper');
var router = express.Router();

//get All Categories
router.get('/all-categories', (req, res) => {

    models.category.findAll({
        attributes: ['id', 'name'],
        where: {
            is_deleted: 0
        }
    }).then(result => {
        return successResponse(res, result, "All Categories");
    }).catch(err => {
        return errorResponse(res, err, "Error While Fetching Categories")
    });
});

//get Category By Id
router.get('/category-details/:id', (req, res) => {
    let id = req.params.id;

    models.category.findAll({
        attributes: ['id', 'name'],
        where: {
            id,
            is_deleted: 0
        }
    }).then(result => {
        return successResponse(res, result, "Category Details");
    }).catch(err => {
        return errorResponse(res, err, "Error While Fetching Category Details")
    });
});

//add Category
router.post('/add-category', (req, res) => {

    const categoryName = req.body.name;
    models.category.create({
        attributes: ['id', 'name'],
        name: categoryName
    }).then(result => {
        return successResponse(res, result, "Category Successfully Added");
    }).catch(err => {
        return errorResponse(res, err, "Error While Adding Category");
    });
});

//update Category
router.put('/update-category/:id', (req, res) => {
    const id = req.params.id;
    const categoryName = req.body.name;
    models.category.update({
        name: categoryName,
    }, {
        where: {
            id
        }
    }).then(result => {
        return successResponse(res, result, "Category Updated Successfully");
    }).catch(err => {
        return errorResponse(res, err, "Error While Updating Category");
    });
});

//soft delete category
router.delete('/soft-delete/:id', (req, res) => {

    models.category.update({
        is_deleted: 1
    }, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        return successResponse(res, result, "Category Successfully Deleted");
    }).catch(err => {
        return errorResponse(res, err, "Error While Deleting Category");
    });
});

//hard delete category
router.delete('/hard-delete/:id', (req, res) => {

    models.category.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        return successResponse(res, result, "Category Successfully Deleted");
    }).catch(err => {
        return errorResponse(res, err, "Error While Deleting Category");
    });

});


router.get('/all-category-count', (req, res) => {
    models.category.count({
      where: {
        is_deleted: 0
      }
    }).then((result) => {
      return res.status(200).send({
        success: true,
        error: false,
        result,
        msg: 'Category Count'
      })
    }).catch((err) => {
      return res.status(500).send({
        success: false,
        error: true,
        err,
        msg: "Failed to fetch users data"
      });
    });
  })
  
module.exports = router;
