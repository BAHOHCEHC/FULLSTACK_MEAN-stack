const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageSRC: {
    type: String,
    default: ''
  },
  user: {
		ref:'usersModel',
		type: Schema.Types.ObjectId
	}
});
module.exports = mongoose.model('categoryModel', categorySchema);