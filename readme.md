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

    "email":"akshar@gmail.com",
    "name":"Akshar Contractor",
    "password":"akshar@123",
    "country":"India",
    "city":"Ahmedabad",
    "address":"18-213 Darshan Appt, Nr Telephone Exchange, Narananpur 380013",
    "mobile_no":"+919104610020",
    "user_type":1
    profile_picturu :(url)

--- user_typt
1 : admin
0 : customer

# Login Api

POST
--- http://localhost:3000/users/login
{
"email":"akshar@gmail.com",
"password":"akshar@123"
}

{
"name":"Akshar Contractor",
"password":"akshar@123"
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

http://localhost:3000/users/hard-delete/akshar@gmail.com

{
"success": true,
"error": false,
"result": 1,
"msg": "User deleted"
}

# user update

http://localhost:3000/users/update-user/akshar@gmail.com

PUT
{
"email":"akshar@gmail.com",
"name":"Akshar Contractor",
"country":"India",
"city":"Ahmedabad",
"address":"18-213 Darshan Appt, Nr Telephone Exchange, Narananpur 380013",
"mobile_no":"+919104610020",
}

# change password user

http://localhost:3000/users/change-password/akshar@gmail.com
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

http://localhost:3000/users/profile-picture-update/akshar@gmail.com

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