import Users from '../models/user.js'

const authAdmin = async (req, res, next) =>{
    try {
        // Get user information by id
        const user = await findOne({
            _id: req.user.id
        })
        if(user.role === 0)
            return res.status(400).json({msg: "Admin resources access denied"})

        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

export default authAdmin