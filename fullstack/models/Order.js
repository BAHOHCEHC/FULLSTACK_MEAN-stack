const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: String,
    required: true
  },
  user: {
    ref: 'userModel',
    type: Schema.Types.ObjectId
  },
  list: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      cost: {
        type: Number
      },
      id: {
        type: String
      }
    }
  ]
});
module.exports = mongoose.model('orderModel', orderSchema);
