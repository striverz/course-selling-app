const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const courseSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  imageURL: {
    type: String,
  },
  creatorId: {
    type: ObjectId,
  },
});

const CourseModel = mongoose.model("CourseModel", courseSchema);

module.exports = {
  CourseModel,
};
