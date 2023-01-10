import { Router } from 'express';
const router = Router()
import rutaCarrito from './carsRoute.js';
import rutaProductos from './productsRoute.js';
import rutaMensajes from './chatRoute.js';
import rutaOrden from './orderRoute.js'
import passport from '../middlewares/passport.js';
import sessionController from '../controller/sessionController.js'
const session = new sessionController()

router.get('/', (req,res)=>{
    res.status(200).render('login')
})
router.get('/signup', (req,res)=>{
    res.status(200).render('signup')
})
router.get('/agregarP', (req,res)=>{
    res.status(200).render('addProd')
})
router.get('/agregarC', (req,res)=>{
    res.status(200).render('addToCar')
})
router.post('/login', session.loginControl)
//Cargar nuevo usuario
router.post("/signup", session.signupControl);

router.get('/fail', session.failControl)

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
