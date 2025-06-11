
import mongoose from "mongoose"

export const connctDB =async ()=>{

    const URI = process.env.MONGO_URI;

    if(!URI)
    {
        return "Please enter uri";
    }


    try{
     await   mongoose.connect(URI)
        console.log("conncted DB")

    }catch(error){
        console.log("error found on db");
        console.log(error);

    }

}



