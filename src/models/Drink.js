const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let DrinkModel = {};

// convert string ID to real mongo ID
const setName = name => _.escape(name).trim();

const DrinkSchema = new mongoose.Schema({
  createdDate: {
    default: Date.now,
    type: Date,
  },
  description: {
    default: '',
    type: String,
  },
  name: {
    type: String,
    required: true,
    set: setName,
    trim: true,
  },
  ingredients: {
    required: true,
    type: [String],
  },
  //
  // owner: {
  //   type: mongoose.Schema.ObjectId,
  //   required: true,
  //   ref: 'Account',
  // },
});

DrinkSchema.statics.toAPI = doc => ({
  name: doc.name,
  age: doc.age,
});

DrinkSchema.statics.findByName = (name, callback) => {

  return DrinkModel.findOne({ name }).select('description ingredients name').exec(callback);
};

DrinkModel = mongoose.model('Drink', DrinkSchema);

module.exports.DrinkModel = DrinkModel;
module.exports.DrinkSchema = DrinkSchema;
