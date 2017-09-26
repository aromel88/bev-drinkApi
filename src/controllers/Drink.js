const models = require('../models');

const Drink = models.Drink;

const findDrinkByName = (req, res) => {
  console.log(req.body.name);
  return Drink.DrinkModel.findByName(req.body.name, (err, doc) => {
    if (err) {
      console.dir(err);
      return res.status(400).json({
        status: 400,
        message: 'Error in findDrinkByName',
        error: err,
      });
    }
    return res.json(doc);
  });
};


const makeDrink = (req, res) => {
  console.dir(req.body);
  if (!req.body.name || !req.body.ingredients) {
    return res.status(400).json({
      status: 400,
      message: 'Missing fields for drink creation',
    });
  }

  const drinkData = {
    description: req.body.description,
    ingredients: req.body.ingredients,
    name: req.body.name,
  };

  const newDrink = new Drink.DrinkModel(drinkData);

  return newDrink.save((err) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        message: 'An error occured saving drink data',
        error: err,
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Successfully created drink',
      data: drinkData,
    });
  });
};

module.exports.findDrinkByName = findDrinkByName;
module.exports.makeDrink = makeDrink;
