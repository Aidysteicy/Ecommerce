import { ContenedorMongo } from '../../contenedores/contenedorMongo.js';
import Carrito from '../../models/carrito.model.js';
import cartDto from '../../dto/cartDto.js'

class CarritoDaoMongo extends ContenedorMongo{

    constructor(){
        super(Carrito)
    }
    
      async addProdToCart(data, usuario, cant) {
        try {
          const mod = {...data, cantidad:cant}
          const email = usuario.email
          const prodCart = await Carrito.findOneAndUpdate(
            { email },
            { $push: { productos: mod }, entrega: usuario.entrega}, {new: true}
          );
          return cartDto(prodCart);
        } catch (error) {
          return error;
        }
      }
    
      async deleteOne(prod, email) {
        try {
          const prodCart = await Carrito.findOneAndUpdate({email}, {$pull: {productos: {codigo: prod.codigo}}}, {new: true})
          return cartDto(prodCart)
        } catch (error) {
          return error;
        }
      }
    
      async deleteAll(email) {
        try {
          return await Carrito.findOneAndUpdate({email}, {$set: {"productos": []}}, {new: true});
        } catch (error) {
          return error;
        }
      }
    

    async deleteProdById(idcar, idpro){
        try {
            let validacion = false
            const buscarC = await this.getbyId(idcar)
            if(buscarC.length!=0 && buscar!='nok'){
                const products = buscarC.productos
                products.forEach(element => {
                    if(element._id==idpro){
                        validacion = true
                    }
                });
                if(validacion){
                    const nuevos_productos = products.filter(pro => pro.id !== idpro)
                    await this.modelo.updateOne({_id: idcar}, {$set: {productos: nuevos_productos}})
                    return 'ok'
                }
            }
            return 'nok'
        } catch (error) {
            console.log(error)
            return 'nok'
        }
    }
}

export {CarritoDaoMongo}