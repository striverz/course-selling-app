- Defining the Schema Databases
- Users

  - firstName : String
  - lastName : String
  - emailId : String
  - password : String

- Admins

  - firstName : String
  - lastName : String
  - emailId : String
  - password : String

- Course

  - title : String
  - Description : String
  - price : Number
  - ImageUrl : String
  - CreatorId : ObjectId --> from admins table relations ship

- Purchases

  - couseId : ObjectId --> from the Course table relation shipt
  - userId : ObjectId --> from the Users table relation ship

- Things to implement

  - adding the relation ship between the database schemas
  - JWT_SECRET diff for admin and the user

- User Route Functionality implementation

  - adding the /signup functionlity for user
  - addign the /signin functionality for user

- Admin Route Functionality implementation

  - adding the /signup functionality of admin
  - adding the /signin functionlaity of admin

- middlewares

  - creating a middleware for userAuth
  - creating a middleware for adminAuth

- Admin Route Functionality implementation
  - after adminMiddleware security implementing the /course api and add the data in the courseModel
