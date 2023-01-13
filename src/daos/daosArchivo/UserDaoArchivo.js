import { ContenedorProducto } from '../contenedores/ContenedorProducto.js'

class UserDaoArchivo extends ContenedorProducto {
    constructor(){
        super('./database/usuarios.json')
    }
}

export default UserDaoArchivo