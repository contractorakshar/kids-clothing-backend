# npm i
# npm run dev (nodemon script)

### api

# get all users
GET
--- http://localhost:3000/users/all-users

# register user
POST
--- http://localhost:3000/users/register-user

{
    "email":"akshar@gmail.com",
    "name":"Akshar Contractor",
    "password":"akshar@123",
    "country":"India",
    "city":"Ahmedabad",
    "address":"18-213 Darshan Appt, Nr Telephone Exchange, Narananpur 380013",
    "mobile_no":"+919104610020",
    "user_type":1
}
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