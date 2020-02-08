const Sequelize = require("sequelize");

const app = require("./messages-api");

const databaseUrl = "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);

db.sync()
  .then(() => console.log("Databse Connected"))
  .catch(err => console.error("ERROR"));

const Movie = db.define("movie", {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
});

Movie.create({
  title: "The Godfather",
  yearOfRelease: 1980,
  synopsis: "One of the best movies"
});

app.get("/:movie", (req,res, next) => {
  Movie.findOne({
    where: {
      req.body.title === `${movie}`
    }
  })
    .then(movie => res.send(movie))
    .catch(err => next(err))
})
