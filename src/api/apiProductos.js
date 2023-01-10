import { productosDao } from '../daos/factoryDao.js';

// _________________________Capa de negocio_________________________//

class ApiProductos {

    async obtenerProductos() { 
        return await productosDao.getAll()
    }
    async obtenerProducto(id) { 
        return await productosDao.getbyField({_id: id})
    }
    async filtrarCategoria(categoria) { 
        return await productosDao.getbyField({categoria: categoria})
    }
    async guardarProducto(producto) { 
        return await productosDao.save(producto, 'productos')
    }
    async modificarProducto(id, prod) { 
        return await productosDao.saveByID(id, prod)
    }
    async eliminarProducto(id) { 
        return await productosDao.deleteById(id)
    }

    getInstance() {
        if (!instance) instance = new ApiProductos();
        return instance;
      }
}

export default ApiProductos
