import ApiProductos from '../api/apiProductos.js'
const api = new ApiProductos()
import logger from '../utils/logger.js'

class prodController {

    async getProd (req, res) {        
        try {
            const username = req.user
            console.log(`usuario ${username.email} autenticado`)
            const productos = await api.obtenerProductos()
            let flag
            productos===undefined || productos.length===0 ? flag=false : flag=true
            res.status(200).render('main',{ isRender: flag, productos: productos})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async getProdId(req,res){
        try {
            const {id} = req.params
            let flag
            const prod = await api.obtenerProducto(id)
            prod===undefined || prod.length===0 ? flag=false : flag=true
            res.status(200).render('main',{ isRender: flag, productos: prod})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async getProdField(req,res){
        try {
            const {categoria} = req.params
            let flag
            const prod = await api.filtrarCategoria(categoria)
            prod===undefined || prod.length===0 ? flag=false : flag=true
            res.status(200).render('main',{ isRender: flag, productos: prod})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    
    async saveProd (req,res){
        try {
            let admin = true
            let flag
            if(admin){
                const producto = req.body
                api.guardarProducto(producto)
                const prod = api.obtenerProductos()
                prod===undefined || prod.length===0 ? flag=false : flag=true
                res.status(200).render('main',{isRender: flag, productos: prod})
            }else{
                logger.error('Ruta /productos metodo POST no autorizada')
                res.json({error: -1, descripcion: 'Ruta /productos metodo POST no autorizada'})
            }
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async putProd (req,res){
        let admin = true
        if(admin){
            const {id}=req.params
            const prod = req.body
            const mod = await api.modificarProducto(id, prod)
            if(mod.length!=0 && mod!=undefined){
                res.send({msg: 'Producto Actualizado'}) 
            }else{
                logger.error('Error al actualizar producto')
                res.send({msg: 'Error al actualizar producto'})
              }
         }else{
            logger.error('Ruta /productos/:id metodo PUT no autorizada')
             res.json({error: -1, descripcion: 'Ruta /productos/:id metodo PUT no autorizada'})
         }
    }

    async deleteProd(req,res){
        let admin = true
        if(admin){
            const {id}=req.params
            const prod = api.eliminarProducto(id)
            if(prod.length!=0 && prod!=undefined){
                res.send({msg: 'Producto Eliminado'}) 
             }else{
                logger.error('No existe un producto con ese ID')
                res.send({msg: 'No existe un producto con ese ID'})
             }
        }else{
            logger.error('Ruta /productos/:id metodo DELETE no autorizada')
            res.json({error: -1, descripcion: 'Ruta /productos/:id metodo DELETE no autorizada'})
        }
    }
}

export {prodController}