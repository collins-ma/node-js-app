const mongoose=require("mongoose");

const connString="mongodb+srv://mboya:mboya1@mboya.4j6jxbr.mongodb.net/?retryWrites=true&w=majority"

const connectFs=async()=>{

    try{
        await mongoose.connect(connString)   
        console.log("succesfull connection of mongodb")

         

        }
        





    
    catch(error){
        console.log("error in connecting mongodb")
        console.log({error})


    }

   






}

module.exports={connectFs}
