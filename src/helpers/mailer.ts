import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail=async({email, emailType,userId}:any)=>{
    try {
        const hashedToken= await bcryptjs.hash(userId.toString(),10)

        //find by id  and update
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            },)
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswoordTokenExpiry:Date.now()+3600000
                },)
        }
        //send email
        const transporter = nodemailer.createTransport({
            // Looking to send emails in production? Check out our Email API/SMTP product!
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                user: "605445017f6e43",
                pass: "eb0caa38bd53a1"
                }
            });
            const mailOptions = {
                from: 'info@myapp.com',
                to: email,
                subject: emailType==="VERIFY"?"Verify your email":"Reset your password",
                html: `<p> Click <a href="${process.env.DOMAIN}">here</a>
                to${emailType==="VERIFY"?"Verify your email":"Reset your password"}</p>`
                };
                const mailResponse= await transporter.sendMail(mailOptions)
                return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}