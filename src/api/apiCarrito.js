import { carritoDao } from '../daos/factoryDao.js';

// _________________________Capa de negocio_________________________//

class ApiCarrito {

    async obtenerCarrito(data) { 
        return await carritoDao.getbyField(data)
    }
    async guardarProducto(producto, usuario, cant) { 
        return await carritoDao.addProdToCart(producto, usuario, cant)
    }
    async eliminarProducto(producto, email) { 
        return await carritoDao.deleteOne(producto, email)
    }
    async modificarCarrito(id, objeto) { 
        return await carritoDao.savebyID(id, objeto)
    }
    async eliminarCarrito(id) { 
        return await carritoDao.deleteById(id)
    }
    async eliminarProdCar(id) { 
        return await carritoDao
    }

    getInstance() {
        if (!instance) instance = new ApiCarrito();
        return instance;
      }
}

export default ApiCarrito
