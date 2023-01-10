import { ContenedorMongo } from '../../contenedores/contenedorMongo.js';
import Usuarios from '../../models/usuario.model.js';
import generateToken from '../../utils/generateToken.js';

class UsuariosDaoMongo extends ContenedorMongo{

    constructor(){
        super(Usuarios)
    }
}

export {UsuariosDaoMongo}
