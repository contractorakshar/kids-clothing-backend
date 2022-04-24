var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var multer = require('multer');
var jwt = require('jsonwebtoken');
const { Op, Sequelize } = require('@sequelize/core');
// const sequelize = require("sequelize");
const { successResponse, errorResponse } = require('../helpers/response.helper');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users')
  },
  filename: function (req, file, cb) {

    const filename = Date.now();
    cb(null, filename + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });

//get all users
router.get('/all-users', (req, res) => {
  models.users.findAll({
    attributes: ['email', 'name', 'city', 'address', 'mobile_no', 'profile_picture', 'user_type', 'country'],
    where: {
      is_deleted: 0
    }
  }).then((result) => {
    return res.status(200).send({
      success: true,
      error: false,
      result,
      msg: 'All Users'
    })
  }).catch((err) => {
    return res.status(500).send({
      success: false,
      error: true,
      err,
      msg: "Failed to fetch users data"
    });
  });
});

//get user details by email
router.get('/user-details/:email', (req, res) => {
  const email = req.params.email;

  models.users.findOne({
    attributes: ['email', 'name', 'city', 'address', 'mobile_no', 'profile_picture', 'user_type', 'country'],
    where: {
      email,
      is_deleted: 0
    }
  }).then((result) => {
    return successResponse(res, result, "User Details");
  }).catch((err) => {
    return errorResponse(res, err, "Failed to fetch User Details");
  });
});

//register user
router.post('/register-user', upload.single('profile_picture'), (req, res) => {
  const userData = req.body;
  userData.profile_picture = req.file.filename;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(userData.password, salt);

  models.users.create({
    email: userData.email,
    name: userData.name,
    password: hash,
    country: userData.country,
    city: userData.city,
    profile_picture: userData.profile_picture,
    address: userData.address,
    mobile_no: userData.mobile_no,
    user_type: userData.user_type,

  }).then((result) => {
    return res.status(200).send({
      success: true,
      error: false,
      result,
      msg: 'User Successfully Registered'
    });
  }).catch((err) => {
    return res.status(500).send({
      success: false,
      error: true,
      err,
      msg: "Failed to fetch users data"
    });
  });
});

//login user
router.post('/login', (req, res) => {
  const userData = req.body;
  models.users.findOne({
    attributes: ['email', 'name', 'password', 'city', 'address', 'mobile_no', 'profile_picture', 'user_type'],
    where: {
      [Op.or]: [
        {
          email: {
            [Op.eq]: userData.email
          }
        },
        {
          name: {
            [Op.eq]: userData.name
          }
        }
      ]
    }
  }).then((result) => {
    let flag = bcrypt.compareSync(userData.password, result.password);
    if (flag) {
      const token = jwt.sign({ name: result.name, email: result.email }, process.env.JWT_SECRET, { expiresIn: "24h" });
      delete result.dataValues.password;
      return res.status(200).send({
        success: true,
        error: false,
        result,
        token,
        msg: "User Logged In Successfully ",
      });
    }

    else {
      return res.status(406).send({
        success: false,
        error: true,
        msg: 'Please Check Password'
      })
    }
  }).catch((err) => {
    return res.status(500).send({
      success: false,
      error: true,
      err,
      msg: "Please Check Credentials"
    });
  });
});

//update user 
router.put('/update-user/:email', (req, res) => {

  const userData = req.body;
  const userEmail = req.params.email;

  models.users.update({
    email: userData.email,
    name: userData.name,
    country: userData.country,
    city: userData.city,
    address: userData.address,
    mobile_no: userData.mobile_no
  }, {
    where: { email: userEmail }
  }).then(result => {
    return res.status(200).send({
      success: true,
      error: false,
      result,
      msg: "User details Updated"
    });
  }).catch(err => {
    return res.status(500).send({
      success: false,
      error: false,
      err,
      msg: "Error While Updating User Details"
    });
  })
});

//change password
router.put('/change-password/:email', (req, res) => {

  const userEmail = req.params.email;
  const newPassword = req.body.password;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(newPassword, salt);

  models.users.update({
    password: hash
  }, {
    where: {
      email: userEmail
    }
  }).then(result => {
    return res.status(200).send({
      success: true,
      error: false,
      result,
      msg: "Password Updated Successfully"
    })
  }).catch(err => {
    return res.status(500).send({
      success: false,
      error: true,
      err,
      msg: "Error While Updating Password"
    })
  })
});

//change profile picture
router.put('/profile-picture-update/:email', upload.single('profile_picture'), (req, res) => {

  const userEmail = req.params.email;
  const newProfilePicture = req.file.filename;

  models.users.update({
    profile_picture: newProfilePicture
  }, {
    where: {
      email: userEmail
    }
  }).then(result => {
    return res.status(200).send({
      success: true,
      error: false,
      result,
      message: "User Profile Picture Updated"
    })
  }).catch(err => {
    return res.status(500).send({
      success: false,
      error: true,
      err,
      message: "Error While Updating Profile Picture"
    })
  })
});

//soft delete user
router.delete('/soft-delete/:email', (req, res) => {
  const userEmail = req.params.email;
  models.users.update({
    is_deleted: 1,
  }, {
    where: { email: userEmail }
  }).then(result => {
    return res.status(200).send({
      success: true,
      error: false,
      result,
      msg: "User Soft Deleted Success"
    });
  }).catch(err => {
    return res.status(500).send({
      success: false,
      error: true,
      err,
      msg: "Error While deleting user"
    });
  });
});

//hard delete user
router.delete('/hard-delete/:email', (req, res) => {
  const userEmail = req.params.email;
  models.users.destroy({
    where: {
      email: userEmail
    }
  }).then((result) => {
    return res.send({
      success: true,
      error: false,
      result,
      msg: "User deleted"
    });
  }).catch((err) => {
    return res.send({
      success: false,
      error: true,
      err,
      msg: "Error While Deleting User"
    });
  });
});

router.get('/all-users-count', (req, res) => {
  models.users.count({
    where: {
      is_deleted: 0,
      user_type: {
        [Sequelize.Op.not]: 1
      }
    }

  }).then((result) => {
    console.log("🚀 ~ file: users.js ~ line 299 ~ router.get ~ result", result)
    return res.status(200).send({
      success: true,
      error: false,
      result,
      msg: 'User Count'
    })
  }).catch((err) => {
    return res.status(500).send({
      success: false,
      error: true,
      err,
      msg: "Failed to fetch users data"
    });
  });
});

module.exports = router;
