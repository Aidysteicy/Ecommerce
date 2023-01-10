import ApiProductos from '../api/apiProductos.js'
const api = new ApiProductos()

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
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async getProdId(req,res){
        const {id} = req.params
        let flag
        const prod = await api.obtenerProducto(id)
        prod===undefined || prod.length===0 ? flag=false : flag=true
        res.status(200).render('main',{ isRender: flag, productos: prod})
    }

    async getProdField(req,res){
        const {categoria} = req.params
        let flag
        const prod = await api.filtrarCategoria(categoria)
        prod===undefined || prod.length===0 ? flag=false : flag=true
        res.status(200).render('main',{ isRender: flag, productos: prod})
    }
    
    async saveProd (req,res){
        let admin = true
        let flag
        if(admin){
            const producto = req.body
            api.guardarProducto(producto)
            const prod = api.obtenerProductos()
            prod===undefined || prod.length===0 ? flag=false : flag=true
            res.status(200).render('main',{isRender: flag, productos: prod})
        }else{
            res.json({error: -1, descripcion: 'Ruta /api/productos metodo POST no autorizada'})
        }
    }

    async putProd (req,res){
        let admin = true
        if(admin){
            const {id}=req.params
             const prod = req.body
             const mod = await api.modificarProducto(id, prod)
             if(mod.length!=0 && mod!='nok'){
                 res.send({msg: 'Producto Actualizado'}) 
              }else{
                  res.send({msg: 'Error al actualizar producto'})
              }
         }else{
             res.json({error: -1, descripcion: 'Ruta /api/productos/:id metodo PUT no autorizada'})
         }
    }

    async deleteProd(req,res){
        let admin = true
        if(admin){
            const {id}=req.params
            const prod = api.eliminarProducto(id)
            if(prod.length!=0 && prod!='nok'){
                res.send({msg: 'Producto Eliminado'}) 
             }else{
                res.send({msg: 'No existe un producto con ese ID'})
             }
        }else{
            res.json({error: -1, descripcion: 'Ruta /api/productos/:id metodo DELETE no autorizada'})
        }
    }
}

export {prodController}