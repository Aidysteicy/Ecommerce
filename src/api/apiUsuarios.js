import { usuariosDao } from '../daos/factoryDao.js';

// _________________________Capa de negocio_________________________//

class ApiUsuarios {

    async obtenerUsuarios() { 
        return await usuariosDao.getAll()
    }
    async obtenerUsuario(email) { 
        return await usuariosDao.getbyField({email: email})
    }
    async guardarUsuario(user) { 
        return await usuariosDao.save(user, 'usuarios')
    }
    async modificarUsuario(id, objeto) { 
        return await usuariosDao.saveByID(id, objeto)
    }
    async eliminarUsuario(id) { 
        return await usuariosDao.deleteById(id)
    }

    getInstance() {
        if (!instance) instance = new ApiUsuarios();
        return instance;
      }
}

export default ApiUsuarios
