const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const AdminModel = mongoose.model("AdminModel", adminSchema);
module.exports = {
  AdminModel,
};
