import { createTransport } from'nodemailer'

//********************Mail******************* */

const transporter = createTransport({
   service: 'gmail',
   port: 587,
   auth: {
       user: 'aidysteicy@gmail.com',
       pass: 'lbrgzhzovmleldvh'
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


async function mandarMail(mailOptions, asunto, option) {
    try {
        const html = `<div>Orden de Compra Generada: 
        <h3>email:${option.email}</h3>,
        <h3>N° Orden: ${option.orden}</h3>,
        <h3>items: ${option.items}</h3>,
        <h3>fecha: ${option.fecha}</h3> </div>`
        const info = await transporter.sendMail({...mailOptions, subject: asunto, html: html})
     } catch (error) {
        console.log(error)
     }
}

export {configurar, mandarMail}