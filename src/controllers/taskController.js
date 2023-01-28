const taskModel=require('../models/taskModel')


const CreateTask=async function(req,res){

 try {
    let data=req.body
    let{Title, Description, Priority, Status}=data
    if (Object.keys(data).length == 0)
    return res.status(400).send({ status: false, message: "Please fill the data to create task" });

    if(!Title) return res.status(400).send({status:false,message:"Title is Mandatory"})
    if(!Description) return res.status(400).send({status:false,message:"Description is Mandatory"})
    if(!Priority) return res.status(400).send({status:false,message:"Priority is Mandatory"})
    if(!Status) return res.status(400).send({status:false,message:"Status is Mandatory"})

    let task = {
        
        Title : Title,
        Description: Description,
        Priority: Priority,
        Status:Status
      };

    let Task=await taskModel.create(task)
    return res.status(201).send({status:true,message:"Task Created Successfully",data:Task})

 } catch (error) {
    return res.status(500).send({message:error.message})
 }
}


const getTask=async function(req,res){
try {

    const getData = await taskModel.find({ isDeleted: false })
    if (getData.length === 0) {
        return res.status(404).send({ status: false, message: "No Task found" })
    }else{
        return res.status(200).send({ status: true, message: "Tasks list", data: getData })

    }

    
} catch (error) {
    return res.status(500).send({message:error.message})

}

}

const UpdateTask=async function(req,res){
  try {
    let task=req.params.taskId
    // let Update=await taskModel.findById(task)
    let Update=await taskModel.findOne({_id:task,isDeleted:false})
    if(Update) return res.status(400).send({status:false,msg:"data not found"})
    let data=req.body
    if (Object.keys(data).length == 0)
    return res.status(400).send({ status: false, message: "Input is not present to update" });

let Updatetask=await taskModel.findOneAndUpdate({_id:task},data,{new:true})
return res.status(200).send({status:true,msg:"Updated Successfully",data:Updatetask})
  } catch (error) {
    return res.status(500).send({message:error.message})

  }
}


const DeleteTask=async function(req,res){
try{
   
    const taskId = req.params.taskId;

    let task = await taskModel.findOne({ _id: taskId, isDeleted: false });
    if (task) {
      return res.status(404).send({ status: false, message: "Task document does not exist or already deleted" });
    }

    let deleteTask = await taskModel.findOneAndUpdate(
      { _id: taskId },
      { $set: { isDeleted: true, deletedAt: new Date().toISOString() } }
    );
    return res.status(200).send({ status: true, message: "Task document deleted successfully" });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
}


module.exports={CreateTask,UpdateTask,DeleteTask,getTask}