________________________________________________________________________________

                              BLUE MONDAY

________________________________________________________________________________

This web-application project consists of two main parts, the backend and frontend.
These are isolated to their own servers for increased modularity.

The backend is built using express and provides JWT authentication, user management
and connection to the MongoDB database through the use of mongoose ODM.

The front is a React + Redux project providing users with the ability to structure
their day by creating jobs and tasks.




API DOCUMENTATION
_______________________

The backend server is set to listen to port 4000 by default. The config.json file
in the root folder of the project may be used to alter this and the database URI.
The documentation includes the paths exposed by the backend for managing users
from a frontend application.

- Users are assigned session tokens upon successful authentication. 
- Passwords are hashed before being stored on the database.

The following paths specify which actions are invoked by the API:


Public:

POST    /api/users/register             |   register new user
POST    /api/users/authenticate         |   authenticate existing user


Requires login:

GET     /api/users/current              |   get current user details
GET     /api/users/readAll              |   get details of all users
GET     /api/users/read                 |   get details of a single user
PUT     /api/users/update               |   update details of a single user
DELETE  /api/users/remove               |   remove a single user



REGISTRATION EXAMPLE REQUEST
-------------------------------------

POST  localhost:4000/api/users/register

HEADER:
Content-type: application/json

BODY:
{
  "username": "Adam123",
  "password": "VerySecret",
  "firstName": "Adam",
  "lastName": "Adamsson",
  "email": "adam123@ijustmadethisup.com"
}


AUTHENTICATION EXAMPLE REQUEST
-------------------------------------

POST  localhost:4000/api/users/authenticate

HEADER:
Content-type: application/json

BODY:
{
  "username": "Adam123",
  "password": "VerySecret",
}


MONGOOSE SCHEMA
-------------------------------------
const schema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  email: { type: String, required: true },
  isAdmin: { type: String, required: true, default: false },
});