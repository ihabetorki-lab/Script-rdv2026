const puppeteer = require("puppeteer");

const TOKEN = "8772780105:AAEMs0FTIoHT5QZuTNOt19sn40VYvMyW5do";
const CHAT = "7694750533";

async function send(msg){
 const url=`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT}&text=${encodeURIComponent(msg)}`;
 await fetch(url);
}

async function check(){

 const browser = await puppeteer.launch({
  args:["--no-sandbox"]
 });

 const page = await browser.newPage();

 await page.goto("https://appointment.mosaicvisa.com/");

 const text = await page.evaluate(()=>document.body.innerText);

 if(text.includes("Available")){
  await send("🚨 يوجد موعد متاح");
 }

 await browser.close();
}

setInterval(check,10000);
check();
