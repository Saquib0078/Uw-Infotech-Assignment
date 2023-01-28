const jwt=require('jsonwebtoken');
const userModel = require('../models/userModel.js');
const UserModel = require("../models/userModel.js");
const validation = require("../userAuth/validation");
const bcrypt = require('bcryptjs')



//user registration

const registerUser= async function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')

  try {
    
    let data=req.body
    let {Name,Email,Password,ConfirmPassword}=data
    if (Object.keys(data).length == 0)
    return res.status(400).send({ status: false, message: "Please fill the data" });

    let securePassword = await bcrypt.hash(data.Password, 10)
    if(!Name){
        return res.status(400).send({status:false,message:"Name is mandatory"})
    }
     if(!validation.isValidname(Name)){
        return res.status(400).send({status:false,message:"Name is not Valid"})
    }
    if(!Email){
        return res.status(400).send({status:false,message:"Email is mandatory"})
    }
     if(!validation.email(Email)){
        return res.status(400).send({status:false,message:"Email is not Valid"})
    }
    let UniqueEmail=await userModel.findOne({email:Email})
    if(UniqueEmail) return res.status(400).send({message:"Email Should be Unique"})
    
    
    if(!Password){
        return res.status(400).send({status:false,message:"Password is mandatory"})
    }
     if(validation.password(Password)){
        return res.status(400).send({status:false,message:"Password is not Valid"})
    }
    if(!ConfirmPassword){
        return res.status(400).send({status:false,message:"Confirm-Password is mandatory"})
    }
     if(validation.password(Password)){
        return res.status(400).send({status:false,message:"Confirm-Password is not Valid"})
    }
    let user = {
        Name: Name,
        Password: securePassword,
        Email:Email,
        ConfirmPassword:securePassword
      };
   
    let CreateUser=await userModel.create(user)
    return res.status(201).send({msg:'UserCreated Successfully',data:CreateUser})

  } catch (error) {
    return res.status(500).send({msg:error.message})
    
  }

}

const loginUser= async function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')

    try {
        const body = req.body;
        if (Object.keys(body).length == 0)
          return res.status(400).send({ status: false, message: "please fill all details to login" });
    
        const { Email, Password } = body;
    
        if (!Email)
          return res.status(400).send({ status: false, message: "Email is mandatory" });
        if (!validation.email(Email))
          return res.status(400).send({ status: false, message: "Invalid email, ex.- ( abc123@gmail.com )" });
    
        if (!Password)
          return res.status(400).send({ status: false, message: "Please provide the password!!" });
    
        let checkUser = await userModel.findOne({ email: Email });
    
        if (checkUser) {
          return res.status(404).send({ status: false, message: "User not found" });
        }
    
        let checkPassword = await bcrypt.compare(Password, body.Password);
        if (checkPassword)
          return res.status(400).send({ status: false, message: "Enter correct Password" });
    
        let createToken = jwt.sign(
          {
            userId: body._id
          },
          "uw-infotech-pvt", { expiresIn: "5 hr" }
        );
    
        return res.status(201).send({ status: true, message: "User login successfully", data: {  token: createToken } });
      } catch (err) {
        return res.status(500).send({msg:err.message});
      }
    };
    

   


module.exports = {registerUser,loginUser}
