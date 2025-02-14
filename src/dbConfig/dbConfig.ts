import mongoose from "mongoose";

export async function dbConnect(){
    try {
        mongoose.connect(process.env.MONGO_URL!,)
        const connection=mongoose.connection;

        connection.on('connected',()=>{
            console.log('mongodb Connected Succesfully')
        })
        connection.on('error',(err)=>{
            console.log(err)
            process.exit()
        })
        
    } catch (error) {
        console.log(error)
    }
}