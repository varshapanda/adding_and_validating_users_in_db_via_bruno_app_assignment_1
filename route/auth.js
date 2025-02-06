const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../model/user.model.js');

const router = express.Router();

router.post('/register',async(req, res)=>{
    try{
        const {name, email, password}= req.body;
        if(!name||!email||!password){
            return res.status(400).json({error:'All fields are required'});
        }
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'Email already registered'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({name,email, password:hashedPassword});
        await newUser.save();

        return res.status(201).json({message:'User registered successfully'});
    }
    catch(err){
        return res.status(500).json({error:'Registration failed', details:err.message})
    }

})

module.exports = router;