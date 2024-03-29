const movies = [
  {
    id: 1,
    firstname: "Citizen Kane",
    lastname: "Orson Wells",
    email: "1941",
    city: false,
    language: 120,
  },
  {
    id: 2,
    firstname: "The Godfather",
    lastname: "Francis Ford Coppola",
    email: "1972",
    city: true,
    language: 180,
  },
  {
    id: 3,
    firstname: "Pulp Fiction",
    lastname: "Quentin Tarantino",
    email: "1994",
    city: true,
    language: 180,
  },
];

const database = require("../../database");

const getMovies = (req, res) => {
  database
    .query("select * FROM movies")
    .then(([movies]) => {
      res.json(movies); // use res.json instead of console.log
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`select * FROM movies WHERE id = ${id}`)
    .then(([movies]) => {
      if (movies[0] != null){
      res.json(movies[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500)
    });
};

const getUsers = (req, res) => {
  database
  .query("select * FROM users")
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  database
  .query(`SELECT * FROM users WHERE id = ${id}`)
  .then(([users]) => {
    if (users[0] != null){
    res.json(users[0]);
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500)
  });
};

const postMovie = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO movies(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUsersById,
  postMovie,
  postUsers,
};
