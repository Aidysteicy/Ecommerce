import { mensajesDao } from '../daos/factoryDao.js';

// _________________________Capa de negocio_________________________//

class ApiMensajes {

    async obtenerMensajes() { 
        return await mensajesDao.getAll()
    }
    async obtenerMensajesUser(email) { 
        return await mensajesDao.getbyField({email})
    }
    async modificarMensaje(id, objeto) { 
        return await mensajesDao.saveByID(id, objeto)
    }
    async eliminarMensaje(id) { 
        return await mensajesDao.deleteById(id)
    }

    getInstance() {
        if (!instance) instance = new ApiMensajes();
        return instance;
      }
}

export default ApiMensajes
