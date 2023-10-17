const express=require('express');
const { AuthModel } = require('../model/auth.model');
const authRouter=express.Router();
var jwt = require('jsonwebtoken');
require('dotenv').config()

/***Registration By The User */
authRouter.post("/",async(req,res)=>{
    const {email,password,place}=req.body;
    try {
        const user=new AuthModel({email:email,password:password,place:place})
        await user.save()
        res.status(200).send({'msg':"Registration has been done"})
    } catch (error) {
        res.status(400).send({'msg':error.message})
    }

})

/**Log in By The User */
authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await AuthModel.findOne({email:email,password:password})
        if(user){
            res.status(200).send({'msg':"Login Successfull!!",'data':user,'token' : jwt.sign({ foo: 'bar' }, process.env.secret, { expiresIn: '60' })});
        }else{
            res.status(200).send({'msg':"Some error occured in Login"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={
    authRouter
}
