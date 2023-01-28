
const mongoose=require("mongoose")


const TaskSchema= new mongoose.Schema({

    Title:{type:String ,required:true},
     Description:{type:String ,
        required:true}, 
        Priority:{type:String,required:true}, 
        Status:{type:String,default:'pending'},
        isDeleted:{type:Boolean,default:false},
        deletedAt: {type:Date}

     
    },{ timestamps: true })

    
module.exports=mongoose.model('Tasks',TaskSchema)
