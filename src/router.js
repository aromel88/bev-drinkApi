const controllers = require('./controllers');

const router = (app) => {
  app.get('/drink', controllers.Drink.findDrinkByName);
  app.post('/drink', controllers.Drink.makeDrink);
  app.get('/ingredient', controllers.Ingredient.getIngredient);
  app.post('/ingredient', controllers.Ingredient.makeIngredient);
  app.get('/fetch', controllers.Ingredient.fetch);
};

module.exports = router;
