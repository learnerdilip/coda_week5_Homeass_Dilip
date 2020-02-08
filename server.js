//Express Server
const express = require("express");
const app = express();

const port = 4001;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server listening on: ${port}`));

const Movie = require("../saturday-homeassignment/sequelize-rest");

// CREATE
app.post("/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(err => next(err));
});

// READ ALL
app.get("/movies", (req, res, next) => {
  Movie.findAll()
    .then(movies => res.send(movies))
    .catch(err => next(err));
});

// READ(SINGLE)
app.get("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(item => res.send(item))
    .catch(err => next(err));
});

// UPDATE(SINGLE)
app.put("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => movie.update(req.body))
    .then(item => res.send(item))
    .catch(err => next(err));
});

// DELETE(SINGLE)
app.delete("/movies/:id", (req, res, next) => {
  Movie.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(number => res.send({ success: true }))
    .catch(err => next(err));
});
