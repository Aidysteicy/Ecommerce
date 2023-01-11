import { createTransport } from'nodemailer'
import logger from './logger.js'
import dotenv from 'dotenv'
dotenv.config()
//********************Mail******************* */

const transporter = createTransport({
   service: 'gmail',
   port: 587,
   auth: {
       user: process.env._EMAIL,
       pass: process.env._PASS
   }
})
function configurar(mail){
   return {
   from: 'Servidor Node.js',
   to: mail,
   attachments: [
       {
           path: 'https://raw.githubusercontent.com/andris9/Nodemailer/master/assets/nm_logo_200x136.png'
       }
   ]
}
}

async function mandarMail(mailOptions, asunto, html) {
    try {
        return await transporter.sendMail({...mailOptions, subject: asunto, html: html})
     } catch (error) {
        logger.error(error)
     }
}

function vistaMail(option, tipo){
    let html
    if(tipo===1){
        html = `<div>Orden de Compra Generada: 
        <h3>email:${option.email}</h3>,
        <h3>N° Orden: ${option.orden}</h3>,
        <h3>items: ${option.items}</h3> </div>`
    } else if(tipo===2){
        html = `<div>Ifo del nuevo usuario: 
        <h3>nombre:${option.email}</h3>,
        <h3>nombre: ${option.nombre}</h3>,
        <h3>direcion: ${option.direccion}</h3>,
        <h3>telefono: ${option.telefono}</h3> </div>`
    } return html
}

export {configurar, mandarMail, vistaMail}