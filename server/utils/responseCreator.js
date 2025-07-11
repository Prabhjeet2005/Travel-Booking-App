const responseCreator = (message,data={})=>{
  return {success:true,message,data}
}

const errorCreator = (message,errorCode=500)=>{
  const err = new Error(message)
  err.status = errorCode
  throw err
}

module.exports = {responseCreator,errorCreator}