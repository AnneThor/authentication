# authentication
Node.js, Express, BCrypt, Mongoose Basic Authentication
Sign up and Sign in users

## Author: Anne Thorsteinson

**[Tests](https://github.com/AnneThor/authentication/actions)**

**[Front End](https://authentication-at.herokuapp.com/)**

## Setup

```.env``` requirements:

- ```PORT``` - port number

## Running the App

- ```npm start```
- Endpoints:
* ```POST``` requests to ```/sign-in``` will compare the plain text password with the bcrypt hash stored in the Users database and return the status of loggedIn ```true``` or ```false``` 
* ```POST``` requests to ```/sign-up``` will has the password and send to the user database to store (if the user with this username does not already exist)

## Tests

- Unit Tests: ```npm run test``` (tests for server, routes, and user model currently implemented)
- Lint Tests: ```npm run lint```


## UML Diagram

![UML diagram of basic express server project](./Lab06.png)
