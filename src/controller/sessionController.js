import generateToken from '../utils/generateToken.js'
import { createHash, isValidePassword } from '../utils/passHelper.js';
import ApiUsuarios from '../api/apiUsuarios.js'
const apiUser = new ApiUsuarios()
import logger from '../utils/logger.js'

class sessionController{

    async signupControl (req, res) {
        try {
            const {fullname, email, password, validatePassword, address, phone, admin} = req.body
            if(password !== validatePassword) return res.render('fail', {error_message: `No coincide el password`})
            let user = await apiUser.obtenerUsuario(email)
            if(user.length!==0 && user!= 'nok'){
                return res.render('fail', {error_message: `User ${email} ya existe`})
            }
            const newUser = {
                fullname,
                email,
                password: createHash(password),
                address,
                phone,
                admin
            }
            await apiUser.guardarUsuario(newUser)
            res.redirect('/')
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
            if (user=='nok' || user.length==0) {
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
                 console.log(err)
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
}

export default sessionController

