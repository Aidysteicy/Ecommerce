import { ContenedorMongo } from '../../contenedores/contenedorMongo.js';
import Producto from '../../models/productos.model.js';
import prodDto from '../../dto/productDto.js'
import { logger } from '../utils/logger.js';
class ProductosDaoMongo extends ContenedorMongo{

    constructor(){
        super(Producto)
    }
    async getAll(){
        try {
            const docs = await this.modelo.find()
            return prodDto(docs)
        } catch (error) {
            logger.error(error)
        }
    }
    async getbyField(field){
        try {
            const doc = await this.modelo.find(field)
            return prodDto(doc)
        } catch (error) {
            logger.error(error)
        }
    }
}

export {ProductosDaoMongo}
