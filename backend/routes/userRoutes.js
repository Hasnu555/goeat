const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require("express-validator");



router.post("/register",    [
    body("email").isEmail(),
    body("password").isLength({ min: 7 }),
]
    ,async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {   
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    
        try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location
        }).then((user) => {
            res.status(201).json({
                success: true,
                user,
            });
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


);

router.post("/login", [
    body("email").isEmail(),
    body("password").isLength({ min: 7 }),
  ], async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
  
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      const isValidPassword = await user.comparePassword(req.body.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

module.exports = router;