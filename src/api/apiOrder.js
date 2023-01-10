import { orderDao } from '../daos/factoryDao.js';

// _________________________Capa de negocio_________________________//

class ApiOrder {

    async obtenerOrdenes() { 
        return await orderDao.getAll()
    }
    async obtenerOrden(id) { 
        return await orderDao.getbyField({_id: id})
    }
    async guardarOrden(orden) { 
        return await orderDao.generate(orden)
    }
    async modificarOrden(id, orden) { 
        return await orderDao.saveByID(id, orden)
    }
    async eliminarOrden(id) { 
        return await orderDao.deleteById(id)
    }

    getInstance() {
        if (!instance) instance = new ApiOrder();
        return instance;
      }
}

export default ApiOrder