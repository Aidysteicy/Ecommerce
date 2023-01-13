import { carritoDao } from '../daos/factoryDao.js';

// _________________________Capa de negocio_________________________//

class ApiCarrito {

    async obtenerCarrito(data) { 
        return await carritoDao.getbyField(data)
    }
    async guardarProducto(producto, usuario, cant) { 
        return await carritoDao.addProdToCart(producto, usuario, cant)
    }
    async eliminarProducto(producto, usuario) { 
        return await carritoDao.deleteOne(producto, usuario)
    }
    async modificarCarrito(id, objeto) { 
        return await carritoDao.savebyID(id, objeto)
    }
    async eliminarCarrito(id) { 
        return await carritoDao.deleteById(id)
    }

    getInstance() {
        if (!instance) instance = new ApiCarrito();
        return instance;
      }
}

export default ApiCarrito
