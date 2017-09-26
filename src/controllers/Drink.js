const models = require('../models');

const Drink = models.Drink;

/**
 * handle GET request for drink by name
 * @param req - request object
 * @param res - response object
 */
const findDrinkByName = (req, res) => {
  const name = `${req.params.name}`;
  return Drink.DrinkModel.findByName(name, (err, doc) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        message: 'Error in findDrinkByName',
        error: err,
      });
    }
    return res.status(200).json(doc);
  });
};

/**
 * handle POST request for creation of new drink
 * @param req - request object
 * @param res - response object
 */
const makeDrink = (req, res) => {
  if (!req.body.name || !req.body.ingredients) {
    return res.status(400).json({
      status: 400,
      message: 'Missing fields for drink creation',
    });
  }

  const drinkData = {
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    name: req.body.name,
  };

  const newDrink = new Drink.DrinkModel(drinkData);

  return newDrink.save((err, doc) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        message: 'An error occurred saving drink data',
        error: err,
      });
    }

    return res.status(200).json(doc);
  });
};

module.exports.findDrinkByName = findDrinkByName;
module.exports.makeDrink = makeDrink;
