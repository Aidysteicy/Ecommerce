import { ContenedorMongo } from '../../contenedores/contenedorMongo.js';
import Carrito from '../../models/carrito.model.js';
import cartDto from '../../dto/cartDto.js'
import  logger  from '../../utils/logger.js';

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
          logger.error(error)
        }
      }
    
      async deleteOne(prod, email) {
        try {
          const prodCart = await Carrito.findOneAndUpdate({email}, {$pull: {productos: {codigo: prod.codigo}}}, {new: true})
          return cartDto(prodCart)
        } catch (error) {
          logger.error(error)
        }
      }
    
      async deleteAll(email) {
        try {
          return await Carrito.findOneAndUpdate({email}, {$set: {"productos": []}}, {new: true});
        } catch (error) {
          logger.error(error)
        }
      }
}

export {CarritoDaoMongo}