import express from "express";
const router = express.Router();
import Movie from "../models/movies.js";

class APIfeatures {
  constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }
  filtering(){
     const queryObj = {...this.queryString}

     const excludedFields = ['page', 'sort', 'limit']
     excludedFields.forEach(el => delete(queryObj[el]))
     
     let queryStr = JSON.stringify(queryObj)
     queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

  //    gte = greater than or equal
  //    lte = lesser than or equal
  //    lt = lesser than
  //    gt = greater than
     this.query.find(JSON.parse(queryStr))
       
     return this;
  }

  sorting(){
      if(this.queryString.sort){
          const sortBy = this.queryString.sort.split(',').join(' ')
          this.query = this.query.sort(sortBy)
      }else{
          this.query = this.query.sort('-createdAt')
      }

      return this;
  }

  paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 9
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit)
      return this;
  }
}

router.route("/add").post((req, res) => {
  const { title, description, showTime, images, cast, duration, availableTheaters } = req.body;

  if(!images) return res.status(400).json({msg: "No image upload"});

  const newMovie = new Movie({
    title,
    description,
    showTime,
    images,
    cast,
    duration,
    availableTheaters,
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
  const { title, description, showTime, images, cast, duration, availableTheaters } = req.body;
  if(!images) return res.status(400).json({msg: "No image upload"});

  const updateMovie = {
    title,
    description,
    showTime,
    images,
    cast,
    duration,
    availableTheaters,
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
