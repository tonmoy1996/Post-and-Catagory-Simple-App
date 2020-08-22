const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});

const Catagory = mongoose.model('Catagory', catagorySchema);

exports.catagorySchema = catagorySchema;
exports.Catagory = Catagory;
