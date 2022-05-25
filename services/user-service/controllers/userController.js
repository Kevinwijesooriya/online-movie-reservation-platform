import User from "../models/user.js";
import bcrypt from "bcryptjs";
import validateEmail from "../helpers/validateEmail.js";
import jwt from 'jsonwebtoken';

const userController = {
    register: async (req,res) => {
      try {
        // get info
        const { name, email, password, phone} = req.body;
  
        // check fields
        if (!name || !email || !password ||!phone)
          return res.status(400).json({ msg: "Please fill in all fields." });
  
        // check email
        if (!validateEmail(email))
          return res
            .status(400)
            .json({ msg: "Please enter a valid email address." });
  
        // check user
        const user = await User.findOne({ email });
        if (user)
          return res
            .status(400)
            .json({ msg: "This email is already registered in our system." });
  
        // check password
        if (password.length < 6)
          return res
            .status(400)
            .json({ msg: "Password must be at least 6 characters." });
  
        // hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

         // add user
      const newUser = new User({
        name,
        email,
        password:hashPassword,
        phone
       
        
      });
      await newUser.save();
  
   
      res.status(200).json({ 
        msg: "Welcome! Please Login.",
        success: true,  
      });
       } catch (err) {
       res.status(500).json({ msg: err.message,
        success: false });
     }
    },
    signing: async (req, res) => {
        try {
          // get cred
          const { email, password } = req.body;
    
          // check email
          const user = await User.findOne({ email });
          if (!user)
            return res
              .status(400)
              .json({ msg: "This email is not registered in our system." });
    
          // check password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
            return res.status(400).json({ msg: "This password is incorrect." });
    
              
           // If login success , create access token and refresh token
           const accesstoken = createAccessToken({id: user._id})
          

          res.status(200).json({ msg: "Signing success" ,token:accesstoken});
        } catch (err) {
          res.status(500).json({ msg: err.message });
        }
      },
      getUser: async (req, res) =>{
        try {
            const user = await User.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
      signout: async (req, res) => {
        try {
            return res.status(200).json({ msg: "Signout success." });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
      },
      update: async (req, res) => {
        try {
          // get info
          const { name, email, phone } = req.body;
    
          // update
          await User.findOneAndUpdate({ _id: req.user.id }, { 
              name, 
              email, 
              phone 
            });
          // success
          res.status(200).json({ msg: "Update success." });
        } catch (err) {
          res.status(500).json({ msg: err.message });
        }
      },
      resetPassword: async (req, res) => {
        try {
          // get password
          const { email,password } = req.body;

          const user = await User.findOne({ email });
         if (!user)
            return res
          .status(400)
          .json({ msg: "This email is not registered in our system." });
    
          // hash password
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(password, salt);
    
          // update password
          await User.findOneAndUpdate(
            { _id: user._id },
            { password: hashPassword }
          );
    
          // reset success
          res.status(200).json({ msg: "Password was updated successfully." });
        } catch (err) {
          res.status(500).json({ msg: err.message });
        }
      },
      addCart: async (req, res) =>{
        try {
            const user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await User.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAllUsers:async(req,res)=>{
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        return res.status(500).json({msg: error.message})
      }
    },
    updateUserRole:async(req,res)=>{
      try {
        const { role } = req.body;
        const userID = req.params.id;
        await User.findByIdAndUpdate({_id: userID}, {
          role: role
      })
      } catch (error) {
        return res.status(500).json({msg: error.message})
      }
    },
    deleteUser:async(req,res)=>{
      try {
        const userID = req.params.id;
        console.log(userID);
        await User.findByIdAndDelete(userID);
        res.status(200).json({msg: "Deleted"})
      } catch (error) {
        return res.status(500).json({msg: error.message})
      }
    }
   
  };

  const createAccessToken = (user) =>{
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
  }

  export default userController;