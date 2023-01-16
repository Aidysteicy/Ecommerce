import dotenv from 'dotenv'
dotenv.config()

let productosDao
let carritoDao
let mensajesDao
let usuariosDao
let orderDao

    switch('mongodb'){
        case 'file':
            const {ProductosDaoArchivo} = await import ('./daosArchivo/ProductosDaoArchivo.js')
            productosDao = new ProductosDaoArchivo('../database/productos.json')
            const CarritoDaoArchivo = await import ('./daosArchivo/CarritoDaoArchivo.js')
            carritoDao = new CarritoDaoArchivo('../database/carritos.json')
            break;
    
        case 'mongodb':
            const {ProductosDaoMongo} = await import('./daosMongo/ProductosDaoMongo.js')
            productosDao = new ProductosDaoMongo()
            const {CarritoDaoMongo} = await import('./daosMongo/CarritoDaoMongo.js')
            carritoDao = new CarritoDaoMongo()
            const {MensajesDaoMongo} = await import('./daosMongo/MensajesDaoMongo.js')
            mensajesDao = new MensajesDaoMongo()
            const {UsuariosDaoMongo} = await import('./daosMongo/UsuariosDaoMongo.js')
            usuariosDao = new UsuariosDaoMongo()
            const {OrderDaoMongo} = await import('./daosMongo/OrderDaoMongo.js')
            orderDao = new OrderDaoMongo()
            break;
    
        case 'firebase':
            const {ProductosDaoFirebase} = await import('./daosFirebase/ProductosDaoFirebase.js')
            productosDao = new ProductosDaoFirebase()
            const {CarritoDaoFirebase} = await import('./daosFirebase/CarritoDaoFirebase.js')
            carritoDao = new CarritoDaoFirebase()
            break;
    }


export { productosDao , carritoDao, mensajesDao, usuariosDao, orderDao }
