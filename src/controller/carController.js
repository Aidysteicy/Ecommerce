import ApiCarrito from '../api/apiCarrito.js'
const api = new ApiCarrito()
import ApiProducto from '../api/apiProductos.js'
const apiProd = new ApiProducto()

class carController {

    async getProd (req, res) {
        try {
            const email= req.user.email
            const carr = await api.obtenerCarrito({email: email})
            let flag
            carr===undefined || carr.length===0 ? flag=false : flag=true
            res.status(200).render('carrito',{isRender: flag, productos: carr[0].productos})
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    async getProdId(req,res){
        const {id} = req.params
        const micarrito = api.obtenerCarrito({_id: id})
        if(micarrito.length!=0 && micarrito!='nok'){
             res.json(micarrito)
        }else{
            res.send({msg: 'No existe un carrito con ese ID'})
        }
    }

    async addProd(req, res) {
        try {
            const username = req.user
            const codigo = req.body.codigo
            let cant = 1
            const car = await api.obtenerCarrito({email: username.email})
            const products = car[0].productos
                products.forEach(element => {
                    if(element.codigo==codigo){
                        cant = element.cantidad + 1
                    }
                });
            await api.eliminarProducto(req.body, username.email)
            const add = await api.guardarProducto(req.body, username, cant)
            res.json({success: true, message: add})
        } catch (error) {
          res.status(500).json({error: error.message})
        }
    }

    async putCar (req,res){
        const {id}=req.params
        const prod = req.body
        const mod = api.modificarCarrito(id,prod)
        if(mod.length!=0 && mod!='nok'){
           res.send({msg: 'Producto Actualizado'}) 
        }else{
            res.send({msg: 'Error al actualizar producto'})
        }
    }

    async deleteCar(req,res){
        const {id}=req.params
        const prod = await api.eliminarCarrito(id)
        if(prod.length!=0 && prod!='nok'){
            res.send({msg: 'Carrito Eliminado'}) 
        }else{
            res.send({msg: 'No existe un carrito con ese ID'})
        }
    }
}

export {carController}