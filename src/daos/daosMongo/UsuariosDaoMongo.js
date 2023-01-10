import { ContenedorMongo } from '../../contenedores/contenedorMongo.js';
import Usuarios from '../../models/usuario.model.js';

class UsuariosDaoMongo extends ContenedorMongo{

    constructor(){
        super(Usuarios)
    }
}

export {UsuariosDaoMongo}
