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
