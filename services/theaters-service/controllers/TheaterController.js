import Theaters from '../models/theater.js';

// Filter, sorting and paginating

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

const theaterController={
    getTheaters: async(req, res) =>{
        try {
            const features = new APIfeatures(Theaters.find(), req.query)
            .filtering().sorting().paginating()

            const theaters = await features.query

            res.json({
                status: 'success',
                result: theaters.length,
                theaters: theaters
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createTheater: async(req, res) =>{
        try {
            const {name, location, images} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const theater = await Theaters.findOne({name})
            if(theater)
                return res.status(400).json({msg: "This theater already exists."})

            const newTheater = new Theaters({
                name, location, images
            })

            await newTheater.save()
            res.json({msg: "Created a Theater"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTheater: async(req, res) =>{
        try {
            await Theaters.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Theater"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateTheater: async(req, res) =>{
        try {
            const { name, location, images} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Theaters.findOneAndUpdate({_id: req.params.id}, {
                name, location, images
            })

            res.json({msg: "Updated a Theater"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }


}

export default theaterController;