const models = require('../models');

const Ingredient = models.Ingredient;

const findIngredientById = (req, res) => {
  const id = `${req.params.id}`;
  return Ingredient.IngredientModel.findById(id, (err, doc) => {
    if (err) {
      console.dir(err);
      return res.status(400).json({
        status: 400,
        message: 'Error in findIngredientByName',
        error: err,
      });
    }
    return res.json(doc);
  });
};

/**
 * handle GET request for ingredient by name
 * @param req - request object
 * @param res - response object
 */
const findIngredientByName = (req, res) => {
  const name = `${req.params.name}`;
  return Ingredient.IngredientModel.findByName(name, (err, doc) => {
    if (err) {
      console.dir(err);
      return res.status(400).json({
        status: 400,
        message: 'Error in findIngredientByName',
        error: err,
      });
    }
    return res.json(doc);
  });
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
    brand: req.body.brand,
    description: req.body.description,
    name: req.body.name,
    type: req.body.type,
  };

  const newIngredient = new Ingredient.IngredientModel(ingredientData);

  return newIngredient.save((err, doc) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        message: 'An error occurred saving ingredient data',
        error: err,
      });
    }

    return res.status(200).json(doc);
  });
};

module.exports.findIngredientById = findIngredientById;
module.exports.findIngredientByName = findIngredientByName;
module.exports.makeIngredient = makeIngredient;
