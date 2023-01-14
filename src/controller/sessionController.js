import generateToken from '../utils/generateToken.js'
import { createHash, isValidePassword } from '../utils/passHelper.js';
import ApiUsuarios from '../api/apiUsuarios.js'
const apiUser = new ApiUsuarios()
import logger from '../utils/logger.js'
import {configurar, mandarMail, vistaMail}  from '../utils/enviarMail.js';

class sessionController{

    async signupControl (req, res) {
        try {
            const {fullname, email, password, validatePassword, address, phone, admin} = req.body
            if(password !== validatePassword) return res.render('fail', {error_message: `No coincide el password`})
            let user = await apiUser.obtenerUsuario(email)
            if(user.length!==0 && user!= undefined){
                return res.render('fail', {error_message: `User ${email} ya existe`})
            }
            const newUser = {
                fullname,
                email,
                password: createHash(password),
                address,
                phone
            }
            await apiUser.guardarUsuario(newUser)
            const opt = configurar(email)
            const html = vistaMail(newUser, 2)
            mandarMail(opt, 'Nuevo usuario registrado', html)
            res.redirect('/login')
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async loginControl (req, res){
        try {
            const {username, password} = req.body
            let user = await apiUser.obtenerUsuario(username)
            if (user==undefined || user.length==0) {
                return res.render('fail', {error_message: `User ${username} no registrado`})
            }
            if (!isValidePassword(user[0], password)) {
                return res.render('fail',  {error_message: 'Password incorrect'} )
            }
            const access_token = generateToken(user)
            res.cookie('access_Token', access_token, { httpOnly: true })
            res.redirect('/productos')
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    
    async logoutControl (req, res, next){
        try {
            const username = req.user
            res.clearCookie('access_Token')
            req.logout((err)=>{
                if(err) { 
                 logger.error(err)
                 return next(err)
                }  
                res.render('logout', {user: username}) 
            })
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    
    async failControl (req,res){
        let error_message = req.flash('error')[0]
        res.status(200).render('fail', {error_message})
    }

    info(req,res){
        try {
            const path = process.cwd()
            const version = process.version
            const so = process.platform
            const memory = process.memoryUsage().rss
            const puerto = process.env.PORT
            const entorno = process.env.NODE_ENV
            const persistencia = process.env.DB
            res.status(200).render('info', {path, version, so, memory, puerto, entorno, persistencia})
        } catch (error) {
            logger.error(error)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    formLogin(req,res){
        res.status(200).render('login')
    }
    formSignup(req,res){
        res.status(200).render('signup')
    }
    formProd(req,res){
        res.status(200).render('addProd')
    }
}

export default sessionController

