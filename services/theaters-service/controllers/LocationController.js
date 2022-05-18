import Location from '../models/location.js'

import Theater from '../models/theater.js'

const locationController = {
    getLocations: async(req, res) =>{
        try {
            const locations = await Location.find()
            res.json(locations)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createLocation: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update location
            const {location} = req.body;
         
           const exitlocation = await Location.findOne({location})
            if(exitlocation) return res.status(400).json({msg: "This location already exists."})

            const newlocation = new Location({location})

            await newlocation.save()
            res.json({msg: "Created a location"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
           
        }
    },
    deleteLocation: async(req, res) =>{
        try {
            const theaters = await Theater.findOne({location: req.params.id})
            if( theaters) return res.status(400).json({
                msg: "Please delete all  theaters with a relationship."
            })

            await Location.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Location"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateLocation: async(req, res) =>{
        try {
            const {location} = req.body;
            await Location.findOneAndUpdate({_id: req.params.id}, {location})

            res.json({msg: "Updated a Location"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


export default locationController;