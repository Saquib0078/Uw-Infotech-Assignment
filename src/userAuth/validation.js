// for personName
const isValidname=function(name){
    if(/^[A-Za-z, ]{2,80}$/.test(name)) return true
    return false
  }

  // for email id
  const email=function(email){
      if(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email) ) return true
      return false
    }
  
   
    // password
    const password=function(password){
        if(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/.test(password) ) return true
        return false
      }

      const isValidObjectId = (objectId) => {
        return mongoose.Types.ObjectId.isValid(objectId);
      }

    module.exports={email,isValidname,password,isValidObjectId}