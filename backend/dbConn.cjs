const mongoose=require("mongoose")

const dbconnection= async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/MediAssist")
        console.log("Db connection successfull")
        
} catch (error) {
    console.log(`Error: ${error}`)
}
}

module.exports=dbconnection