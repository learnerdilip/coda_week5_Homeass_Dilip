const Movie = require("../saturday-homeassignment/sequelize-rest");
//Express Server
const express = require("express");
const app = express();

const port = 4002;

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
  // console.warn("LIMIT AND OFFSET", req.query.limit, req.query.offset);
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
