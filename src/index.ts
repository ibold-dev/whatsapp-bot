import {Client, LocalAuth} from 'whatsapp-web.js';
import dotenv from 'dotenv';
dotenv.config({path:'.env'});
import OpenAi from 'openai';

const HasOpenAiKey = ()=>{
    if(!process.env.OPENAI_APIKEY){
        throw new Error('Include Open AI key in Environment Variables')
    }
}

HasOpenAiKey();

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qr}`)
    console.log('qr code generated')
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on("message", async (message)=>{
    await main(message.body).then(async result=> {
        if(result === null){
            message.reply('I did not quite get you')
        }else{
            message.reply(result);
        }
    })
});

client.initialize(); 


const openai = new OpenAi({
    apiKey : process.env.OPENAI_APIKEY as string
});

async function main(messages:string) {
    const chatCompletion = await openai.chat.completions.create({
    max_tokens:200,
      messages: [{ role: 'user', content: messages }],
      model: 'gpt-3.5-turbo',
    });
    return chatCompletion.choices[0].message.content;
  }


