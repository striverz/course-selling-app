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
  - CreatorId : ObjectId --> from admins table relations ship because the user has to know which course is from
  - add course and return the Creator Id (admin Id basically)
  - update the course and return the creator Id again
  - understood the course end points for adding,updating and getting the courses for admin

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

- course addding end point

  - /api/v1/admin/course(POST)
  - the course has to be added to course Modle(title,description,imageURL,price,creatroId:adminId)
  - the response should returns the "course added" and courseId as well

- course updating end point updateOne({filter},{update})

  - /api/v1/admin/course(PUT)
  - \_id:courseId filter logic is
  - check points
    - creatorId should be equal to adminId
  - the response returns the "course updated" return the course.\_id

- course gettings
- check points

  - from courses Whose creator Id equals to the admin Id all course should return to the feed of the admin
  - return all of the courses

- ADMIN END POINTS ARE COMPLETED

- purchase Schema

  - userId
  - courseId

- endpoints

  - /api/v1/course/preview

    - getting all the courses from the courseModel

  - /api/v1/course/purchase(POST)

    - Post userId ad req.userId and courseId from the body

  - /api/v1/course/purchase(GET)
    - findghe the courses from the purchases where the purchases of userId=req.userId

- COMPLETED THE BACKEND PART OF THE APPLICATION
