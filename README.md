# REST API TO SEARCH A PRODUCT DATA BY ITS BAR CODE
This project is a basic NestJS API interacting with MongoDB as database.

## Stack
* Back : NestJS
* DB : MongoDB

## Project setup for local usage
### Configure MongoDB
The installation instructions can be found on [MongoDB Atlas documentation](https://docs.atlas.mongodb.com/getting-started/).

### Install dependencies
```bash
npm i or yarn install
```

### Setup your environment variables
Go to file `.env.example`

### Run the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

To quit nodemon : Ctrl + c.

## Test
First run the server :

```bash
npm run start:dev
```

Then open a new terminal and run following commands :

```bash
# unit tests
$ npm run test
```

## Presentation
API - taking a bar code plain/text content as an input (and optional fields such as "fields": [code, product_name]) && returning an object with product data if bar code is valid.
The /products/search route is protected. You first have to create an account with the /users/signup and then /users/signin route.

Full documentation of API can be found here: 
http://localhost:3000/api/doc/.

