import { ContenedorMongo } from '../../contenedores/contenedorMongo.js';
import Mensaje from '../../models/mensajes.model.js';

class MensajesDaoMongo extends ContenedorMongo{

    constructor(){
        super(Mensaje)
    }
}

export {MensajesDaoMongo}
