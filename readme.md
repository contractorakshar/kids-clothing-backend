# npm i

# npm run dev (nodemon script)

### api

# get all users

GET
--- http://localhost:3000/users/all-users

# register user

POST
--- http://localhost:3000/users/register-user

FORM DATA

    "email":"test@gmail.com",
    "name":"test",
    "password":"test@123",
    "country":"test",
    "city":"test",
    "address":"test",
    "mobile_no":"+1213211321",
    "user_type":1
    profile_picturu :(url)

--- user_type
1 : admin
0 : customer

# Login Api

POST
--- http://localhost:3000/users/login
{
"email":"test@gmail.com",
"password":"test@123"
}

{
"name":"test test",
"password":"test@123"
}

# user soft delete

DELETE

http://localhost:3000/users/soft-delete/akshar@gmail.com

{
"success": true,
"error": false,
"result": [
1
],
"msg": "User Soft Deleted Success"
}

# user-hard delete

DELETE

http://localhost:3000/users/hard-delete/test@gmail.com

{
"success": true,
"error": false,
"result": 1,
"msg": "User deleted"
}

# user update

http://localhost:3000/users/update-user/test@gmail.com

PUT
{
"email":"test@gmail.com",
"name":"test test",
"country":"test",
"city":"test",
"address":"test",
"mobile_no":"+21312",
}

# change password user

http://localhost:3000/users/change-password/test@gmail.com
PUT
{
"success": true,
"error": false,
"result": [
1
],
"msg": "Password Updated Successfully"
}

# update profile picture

http://localhost:3000/users/profile-picture-update/test@gmail.com

PUT
{
"success": true,
"error": false,
"result": [
1
],
"message": "User Profile Picture Updated"
}

---

### CATEGORY

# get All Categories

GET
http://localhost:3000/category/all-categories

{
"success": true,
"error": false,
"result": [
{
"id": 1,
"name": "shirts"
}
],
"message": "All Categories"
}


# category soft delete
http://localhost:3000/category/soft-delete/1
DELETE -> PUT
{
  "success": true,
  "error": false,
  "result": [
    1
  ],
  "message": "Category Successfully Deleted"
}

# category hard delete
http://localhost:3000/category/hard-delete/1

{
  "success": true,
  "error": false,
  "result": 1,
  "message": "Category Successfully Deleted"
}

### PRODUCTS

# get All products
http://localhost:3000/products/all-products

# get product by id
http://localhost:3000/products/product-details/4

# add product
http://localhost:3000/products/add-product

# soft delete product
http://localhost:3000/products/delete-product-soft/4

# get user by email

# get category by id
