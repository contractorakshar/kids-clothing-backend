var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var multer = require('multer');
var jwt = require('jsonwebtoken');
const { Op } = require('@sequelize/core');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users')
  },
  filename: function (req, file, cb) {

    const filename = Date.now();
    cb(null, filename + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

//get all users
router.get('/all-users', (req, res) => {
  models.users.findAll({
    attributes: ['email', 'name', 'city', 'address', 'mobile_no', 'profile_picture', 'user_type','country'],
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

//register user
router.post('/register-user', upload.single('profile-picture'), (req, res) => {
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
})

module.exports = router;
