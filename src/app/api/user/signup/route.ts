import { dbConnect } from "@/dbConfig/dbConfig";
import User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'


dbConnect();


export async function POST(request:NextRequest) {
    try {
        const reqbody= await request.json();
        const {userName,email,password}=reqbody;
        console.log(reqbody)

        const user =await User.findOne({email})
        if (user){
            return NextResponse.json({error:"User Already exists"},{status:400})
        }

        //hash password

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword= await bcryptjs.hash(password,salt)

        const newUser= new 


    } catch (error: any) {
        return NextResponse.json({error: error.message},{status:500})
        
    }
    
}
