const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const router = require('./router');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/Bev';

mongoose.Promise = global.Promise;
mongoose.connect(dbURL, { useMongoClient: true })
  .catch((err) => {
    console.dir(err);
  });

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.disable('x-powered-by');

router(app);

app.listen(port, (err) => {
  if (err) throw err;

  console.log(`Listening on PORT ${port}`);
});
