import User from "../models/user.js";
import bcrypt from "bcryptjs";
import validateEmail from "../helpers/validateEmail.js";

const userController = {
    register: async (req,res) => {
      try {
        // get info
        const { name, email, password, phone} = req.body;
  
        // check fields
        if (!name || !email || !password ||!phone)
          return res.status(400).json({ message: "Please fill in all fields." });
  
        // check email
        if (!validateEmail(email))
          return res
            .status(400)
            .json({ message: "Please enter a valid email address." });
  
        // check user
        const user = await User.findOne({ email });
        if (user)
          return res
            .status(400)
            .json({ message: "This email is already registered in our system." });
  
        // check password
        if (password.length < 6)
          return res
            .status(400)
            .json({ message: "Password must be at least 6 characters." });
  
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
        message: "Welcome! Please Login.",
        success: true,  
      });
       } catch (err) {
       res.status(500).json({ message: err.message,
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
    
              
          // signing success
          res.status(200).json({ msg: "Signing success" ,user});
        } catch (err) {
          res.status(500).json({ msg: err.message });
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
          const { userId ,name, email, phone } = req.body;
    
          // update
          await User.findOneAndUpdate({ _id: userId }, { 
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
   
  };
  
  export default userController;