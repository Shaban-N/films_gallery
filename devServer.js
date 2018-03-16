const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const bodyParser = require('body-parser');

const app = express();
const compiler = webpack(config);

const host = 'http://localhost';
const port = process.env.npm_config_port ? process.env.npm_config_port : 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, 'localhost', (err) => {
  const url = 'mongodb://localhost:27017/films';

  mongoClient.connect(url, function (err, database) {
    const db = database.db('films')
    app.get('/api/films', (req, res) => {
      // make db call
      db.collection("movies").find({}).toArray(function (err, results) {
        if (err) {
          console.log(err)
        } else {
          console.log(results)
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(results));
        }
      });
    });

    app.delete('/api/films/:id', (req, res) => {
      console.log(req.params.id)
      const id = new objectId(req.params.id);
      db.collection("movies").findOneAndDelete({ _id: id }, function (err, result) {
        if (err) return console.log(err)
        else  res.sendStatus(200);
      })
    });

    app.get('/api/films/:id', (req, res) => {
      const id = new objectId(req.params.id);
      db.collection("movies").findOne({ _id: id }, function (err, result) {
        if (err) return console.log(err)
        else {
          const info = {
            release: result.release,
            format: result.format,
            stars: result.stars
          };
          console.log(info)
          res.setHeader('Content-Type', 'application/json');
          res.send(info)
        }
      })
    });

    app.post('/api/films', (req, res) => {
      const movie = req.body;
      db.collection("movies").insertOne(movie, function (err, result) {
        if (err) return console.log(err)
        else  res.send(movie)
      })
      console.log(req.body)
    });


  });


  if (err) {
    console.log(err);
    return;
  }
  console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
