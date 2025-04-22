const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const purchaseSchema = new Schema({
  courseId: {
    type: ObjectId,
  },
  userId: {
    type: ObjectId,
  },
});

const PurchaseModel = mongoose.model("PurchaseModel", purchaseSchema);

module.exports = {
  PurchaseModel,
};
