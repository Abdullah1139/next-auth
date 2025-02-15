import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody=request.json();
        const {token}:any=reqBody;
        console.log(token)
        const user = await User.findOne({ verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()}});
            if (!user) {
                return NextResponse.json({error:"Inavlid User"},{status:400})
            }
            console.log(user)
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({message:"User Verified",success: true},
            {status:200})

    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}
