const controllers = require('./controllers');

const router = (app) => {
  app.get('/findDrinkByName/:name', controllers.Drink.findDrinkByName);
  app.post('/makeDrink', controllers.Drink.makeDrink);
  app.get('/findIngredientByName/:name', controllers.Ingredient.findIngredientByName);
  app.get('/findIngredientById/:id', controllers.Ingredient.findIngredientById);
  app.post('/makeIngredient', controllers.Ingredient.makeIngredient);
};

module.exports = router;
