import ApiMensajes from '../api/apiMensajes.js'
const api = new ApiMensajes()

class chatController {

    async getChat (req, res) {
        const chat = await mensajesDao.getAll()
        if(chat.length!=0 && chat!='nok'){
           res.send(chat) 
        }else{
            res.send({msg: 'No existe el chat'})
        }
    }

    async getMensajes(req,res){
        const {email} = req.params
        const mens = await api.obtenerMensajesUser(email)
        if(mens.length!=0 &&mens!='nok'){
            res.send(mens) 
         }else{
            res.send({msg: 'No existen mensajes de ese usuario'})
         }
    }
    
    async putMensaje (req,res){
        const {id}=req.params
        const mens = req.body
        const mod = await api.modificarProducto(id, mens)
        if(mod.length!=0 && mod!='nok'){
            res.send({msg: 'Mensaje Actualizado'}) 
        }else{
            res.send({msg: 'Error al actualizar mensaje'})
        }
    }
    
    async deleteMensaje(req,res){
        const {id}=req.params
        const prod = api.eliminarProducto(id)
        if(prod.length!=0 && prod!='nok'){
           res.send({msg: 'Producto Eliminado'}) 
        }else{
           res.send({msg: 'No existe un mensaje con ese ID'})
        }
    }
}

export {chatController}