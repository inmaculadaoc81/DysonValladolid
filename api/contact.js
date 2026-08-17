const { google } = require("googleapis");
module.exports = async function handler(req,res){
 if(req.method==="GET") return res.status(200).json({ok:true,service:"DysonRepair contacto API",node:process.version,environment:{
 GOOGLE_CLIENT_ID:!!process.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:!!process.env.GOOGLE_CLIENT_SECRET,
 GOOGLE_REFRESH_TOKEN:!!process.env.GOOGLE_REFRESH_TOKEN,GOOGLE_EMAIL:!!process.env.GOOGLE_EMAIL,CONTACT_EMAIL:!!process.env.CONTACT_EMAIL}});
 if(req.method!=="POST") return res.status(405).json({error:"Método no permitido"});
 try{
  const {nombre,telefono,email,equipo,mensaje}=req.body||{};
  if(!nombre||!telefono||!email||!mensaje) return res.status(400).json({error:"Faltan campos obligatorios"});
  const oauth2=new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET);
  oauth2.setCredentials({refresh_token:process.env.GOOGLE_REFRESH_TOKEN});
  const gmail=google.gmail({version:"v1",auth:oauth2});
  const subject="Nueva consulta DysonRepair Valladolid";
  const body=`Nueva consulta DysonRepair Valladolid\n\nNombre: ${nombre}\nTeléfono: ${telefono}\nEmail: ${email}\nEquipo/modelo: ${equipo||"-"}\n\nConsulta:\n${mensaje}`;
  const raw=Buffer.from(`From: DysonRepair <${process.env.GOOGLE_EMAIL}>\r\nTo: ${process.env.CONTACT_EMAIL}\r\nReply-To: ${email}\r\nSubject: ${subject}\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n${body}`,"utf8").toString("base64url");
  await gmail.users.messages.send({userId:"me",requestBody:{raw}});
  return res.status(200).json({ok:true});
 }catch(e){console.error(e);return res.status(500).json({error:"No se pudo enviar el mensaje"});}
}