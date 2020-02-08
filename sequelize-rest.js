//DATABASE SETUP
const Sequelize = require("sequelize");
const databaseUrl = "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);

const Movie = db.define("movie", {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
});

db.sync()
  .then(() => console.log("Databse Connected"))
  .then(() =>
    Promise.all([
      Movie.create({
        title: "The Godfather",
        yearOfRelease: 1980,
        synopsis: "One of the best movies"
      }),
      Movie.create({
        title: "The Dark Knight",
        yearOfRelease: 2010,
        synopsis: "One of the best"
      }),
      Movie.create({
        title: "The Goodwill Hunting",
        yearOfRelease: 2014,
        synopsis: "best movies"
      })
    ])
  )
  .catch(err => console.error("ERROR"));

//Express Server
const express = require("express");
const app = express();

const port = 4010;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server listening on: ${port}`));

// CREATE
app.post("/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(err => next(err));
});

// READ ALL
app.get("/movies", (req, res, next) => {
  const limit = req.query.limit || 5;
  const offset = req.query.offset || 0;
  Movie.findAll({ limit, offset })
    .then(movies => res.send({ data: movies, total: movies.length }))
    .catch(err => next(err));
});

// READ(SINGLE)
app.get("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(item => {
      if (item) return res.send(item);
      return res.status(404).end();
    })
    .catch(err => next(err));
});

// UPDATE(SINGLE)
app.put("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (movie) return movie.update(req.body);
      return res.status(404).end();
    })
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
    .then(number => {
      if (number) return res.send({ success: true });
      return res.status(404).end();
    })
    .catch(err => next(err));
});
