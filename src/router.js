const controllers = require('./controllers');

const router = (app) => {
  app.get('/findDrinkByName', controllers.Drink.findDrinkByName);
  app.post('/makeDrink', controllers.Drink.makeDrink);
};

module.exports = router;
