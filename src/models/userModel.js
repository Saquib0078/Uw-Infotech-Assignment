
const mongoose=require("mongoose")


const UserSchema= new mongoose.Schema({

        Name: {type:String, required:true},
        Email: {type:String, unique:true,lowercase:true}, 
        Password: {type:String, required:true},
        ConfirmPassword:{type:String,required:true}
     
    },{ timestamps: true })

    
module.exports=mongoose.model('User',UserSchema)
