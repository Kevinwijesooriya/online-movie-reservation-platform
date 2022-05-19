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

router.route("/addMovie").post(async(req, res) => {
  try {
    const data = req.body;
    const { title, description, catelog, images, cast, duration, availableTheaters } =data;
    console.log("🚀 ~ file: movies.js ~ line 51 ~ router.route ~ data", data)
    
    if(!images) return res.status(400).json({msg: "No image upload"});
  
    const newMovie = new Movie({
      title,
      description,
      catelog,
      images,
      cast,
      duration,
      availableTheaters,
    });
  
    await newMovie.save();
    res.json({msg: "Created a Movie"})
    
  } catch (error) {
    return res.status(500).json({msg: error.message})
    //console.log(error)
  }
 
   
    
});

router.route("/movies").get(async(req, res) => {
  try {
  const features = new APIfeatures(Movie.find(), req.query)
            .filtering().sorting().paginating()

            const movies = await features.query

            res.json({
                status: 'success',
                result: movies.length,
                movies: movies
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
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

router.route("/updateMovie/:id").put(async (req, res) => {
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
