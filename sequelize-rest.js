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

// app.get("/:movie", (req,res, next) => {
//   Movie.findOne({
//     where: {
//       req.body.title === `${movie}`
//     }
//   })
//     .then(movie => res.send(movie))
//     .catch(err => next(err))
// })
