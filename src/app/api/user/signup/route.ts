import { dbConnect } from "@/dbConfig/dbConfig";
import User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";


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

        const newUser= new User({
            userName,
            email,
            password:hashedPassword
        })
        const savedUser= await newUser.save()
        console.log(savedUser)
        //send verificatio email
        await sendEmail({email,emailType:"Verify",
            userId:savedUser._id
        })

        return NextResponse.json({message: "User created successfully",success:true},{status:201})
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status:500})
        
    }
    
}
