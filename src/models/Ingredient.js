const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let IngredientModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const IngredientSchema = new mongoose.Schema({
  brand: {
    default: '',
    type: String,
  },
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
  type: {
    required: true,
    type: String,
  },
});

IngredientSchema.statics.toAPI = doc => ({
  brand: doc.brand,
  name: doc.name,
});

IngredientSchema.statics.fetch = (query, callback) => {
  const searchRegExp = new RegExp(`^${query}`);
  return IngredientModel.find()
    .or([{ brand: searchRegExp }, { name: searchRegExp }]).exec(callback);
};

IngredientSchema.statics.findByName = (name, callback) => {
  return IngredientModel.findOne({ name }).select('brand description name type').exec(callback);
};

IngredientSchema.statics.findById = (id, callback) => {
  return IngredientModel.findOne({ _id: convertId(id) }).select('brand description name type').exec(callback);
};

IngredientModel = mongoose.model('Ingredient', IngredientSchema);

module.exports.IngredientModel = IngredientModel;
module.exports.IngredientSchema = IngredientSchema;
