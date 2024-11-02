import { mailtrapClient,sender } from "../lib/mailtrap.js"
import { createWelcomeEmailTemplate } from "./emailTemplates.js"
export const sendWelcomeMail =async (email,name,profileUrl) => {
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Welcome to UnLinked",
            html:createWelcomeEmailTemplate(name,profileUrl),
            category:"Welcome"
        })
        console.log("Welcome Email send succesfully",response)
    }catch(error){
        throw error;
    }
}