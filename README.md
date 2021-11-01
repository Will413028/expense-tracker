# Expense Tracker
https://stark-escarpment-96022.herokuapp.com/
## Features

- REGISTER: sign up an account with name, email, password
- LOGIN: sign in to review your own expenses
- LOGIN with 3rd-party account: quick login with Facebook account
- LOGOUT: sign out the account by clicking the logout button
- CREATE: record your expense (with item name, date, category, amount) at the create page
- READ: review all the expenses at the home page
- UPDATE: click the edit button to modify expense's data
- DELETE: click the delete button to delete the expense
- FILTER: filter the expenses by category
- Provide a filter function based on different categories

## Getting Started

### Installation

1. Clone the files
``` 
git clone https://github.com/Will413028/expense-tracker.git
```

2. Install the npm packages

```
npm install 
```

3. Create .env file
```
touch .env
```
4. Run MongoDB Server
```
./mongod --dbpath <path to mongodb-data directory>
```
5. Create seeder

```
npm run seed
```
6. Run the project
```
npm run dev
```
While the terminal returns Express is listening on localhost:3000, please visit http://localhost:3000 on your browser.

## Dummy user data
After inserting the seeder, you may use the following dummy data to experience this web application.

| Email              | Password |
| -------------------| ---------|
| user1@example.com  | 12345678 |
| user2@example.com  | 12345678 |

## Packages and Versions

- Node.js & npm - JavaScript runtime environment
- Express.js - web application framework
- Express-Handlebars - template engine
- MongoDB - document-oriented database
- Mongoose - MongoDB object modeling tool(OBM)
- body-parser - middleware
- method-override - middleware
- express-session - middleware
- passport - authentication middleware for Node.js
- bcrypt.js - middleware