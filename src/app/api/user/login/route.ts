import { dbConnect } from "@/dbConfig/dbConfig";
import User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


dbConnect();

export async function POST(request:NextRequest) {
    //login using try catch
    try {
        const reqBody= await request.json();
        const {email,password}=reqBody;
        console.log(reqBody)
        const user=await User.findOne({email});
        
        if(!user) return NextResponse.json('User not found', { status: 404 });
        //validate password 
        const isValidPassword=await bcryptjs.compare(password,user.password);
        if(!isValidPassword) return NextResponse.json('Invalid password', { status: 401 });
        //create token data
        const tokenData={
            id: user._id,
            email: user.email,
            name: user.name,
            }
            //create token
            const token=jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:60
                });
                const response= NextResponse.json({
                    message:"Login SuccessFully",
                    success:true
                })
                response.cookies.set('token',token,{httpOnly:true})
                return response;

         
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
    
            
}

