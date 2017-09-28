import { handleQuery } from '../util/query';

const models = require('../models');

const Ingredient = models.Ingredient;

const fetch = (req, res) => {
  const value = req.query.value;
  return Ingredient.IngredientModel.fetch(value, (err, doc) => handleQuery(res, err, doc));
};

const getIngredient = (req, res) => {
  const id = req.query.id;
  if (req.query.id) {
    return Ingredient.IngredientModel.findById(id, (err, doc) => handleQuery(res, err, doc));
  }
  return Ingredient.IngredientModel.findByName(req.query.name || '', (err, doc) =>
    handleQuery(res, err, doc));
};

/**
 * handle POST request for creation of new ingredient
 * @param req - request object
 * @param res - response object
 */
const makeIngredient = (req, res) => {
  if (!req.body.name || !req.body.type) {
    return res.status(400).json({
      status: 400,
      message: 'Missing fields for ingredient creation',
    });
  }

  const ingredientData = {
    brand: req.body.brand || '',
    description: req.body.description || '',
    name: req.body.name || '',
    type: req.body.type || '',
  };

  const newIngredient = new Ingredient.IngredientModel(ingredientData);
  return newIngredient.save((err, doc) => handleQuery(res, err, doc));
};

module.exports = {
  fetch,
  getIngredient,
  makeIngredient,
};
