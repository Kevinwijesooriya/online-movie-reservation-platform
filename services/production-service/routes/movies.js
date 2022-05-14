import express from "express";
const router = express.Router();
import Movie from "../models/movies.js";

router.route("/add").post((req, res) => {
  const { title, description, showTime, banner, cast } = req.body;

  const newMovie = new Movie({
    title,
    description,
    showTime,
    banner,
    cast,
  });

  newMovie
    .save()
    .then(() => {
      res.status(200).send({ status: "Movie added" });
      console.log("Movie added");
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with adding movie ", error: err.message });
      console.log("Error with adding movie :", err);
    });
});

router.route("/").get((req, res) => {
  Movie.find()
    .then((Movie) => {
      res.json(Movie);
      console.log("Movies fetched :", Movie);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with fetching movies ", error: err.message });
      console.log("Error with fetching movies :", err);
    });
});

router.route("/get/:id").get(async (req, res) => {
  let movieID = req.params.id;
  await Movie.findById(movieID)
    .then((movie) => {
      res.status(200).send({ status: "Movie fetched", movie });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with fetching movie", error: err.message });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let movieID = req.params.id;
  const { title, description, showTime, banner, cast } = req.body;

  const updateMovie = {
    title,
    description,
    showTime,
    banner,
    cast,
  };

  await Movie.findByIdAndUpdate(movieID, updateMovie)
    .then(() => {
      res.status(200).send({ status: "Movie updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating movie", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let movieID = req.params.id;
  await Movie.findByIdAndDelete(movieID)
    .then(() => {
      res.status(200).send({ status: "Movie deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting the movie", error: err.message });
    });
});

export default router;
