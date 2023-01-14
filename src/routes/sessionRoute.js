import { Router } from 'express';
const router = Router()
import rutaCarrito from './carsRoute.js';
import rutaProductos from './productsRoute.js';
import rutaMensajes from './chatRoute.js';
import rutaOrden from './orderRoute.js'
import passport from '../middlewares/passport.js';
import sessionController from '../controller/sessionController.js'
const session = new sessionController()
//**************Informacion del server***************//
router.get('/', session.info)
//***************Formulario de login*****************//
router.get('/login', session.formLogin)
//*************Formulario de Registro****************//
router.get('/signup', session.formSignup)
//********Formulario para agregar productos**********//
router.get('/agregarP', session.formProd)
//*************Registrar nuevo usuario***************//
router.post('/login', session.loginControl)
//*************Registrar nuevo usuario***************//
router.post("/signup", session.signupControl);
//******************Carga errores********************//
router.get('/fail', session.failControl)
//****************Cierre de sesion*******************//
router.get('/logout', session.logoutControl)

router.use(passport.authenticate('login',{
    failureRedirect: '/fail',
    failureFlash: true
}))
router.use('/orden', rutaOrden)
router.use('/productos', rutaProductos)
router.use('/carrito', rutaCarrito)
router.use('/chat', rutaMensajes)

export default router
