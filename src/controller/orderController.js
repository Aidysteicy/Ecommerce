import ApiOrder from '../api/apiOrder.js';
const api = new ApiOrder();
import ApiCarrito from '../api/apiCarrito.js'
const apiCar = new ApiCarrito()
import {configurar, mandarMail, vistaMail}  from '../utils/enviarMail.js';
import logger from '../utils/logger.js'

class orderController {

    async getOrders (req, res) {
        try {
            const ordenes = await api.obtenerOrdenes()
            res.status(200).json(ordenes)
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({error:error.message})
        }
    }

    async getOrder(req,res){
        try {
            const {id} = req.params
            const orden = await api.obtenerOrden(id)
            res.status(200).json(orden)
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({error:error.message})
        }
    }

    async saveOrder(req, res) {
        try {
            const email= req.user.email
            const car = await apiCar.obtenerCarrito({email: email})
            const orden = await api.guardarOrden(car[0])
            const opt = configurar(email)
            const html = vistaMail(orden, 1)
            mandarMail(opt, 'Nueva orden generada', html)
            res.status(200).json({success: true, orden: orden})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({error: error.message})
        }
    }

    async putOrder (req,res){
        try {
            const {id}=req.params
            const orden = req.body
            const mod = await api.modificarOrden(id,orden)
            res.status(200).json({success: true, orden: mod})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({error: error.message})
        }
    }

    async deleteOrder(req,res){
        try {
            const {id}=req.params
            const mod = await api.eliminarOrden(id)
            res.status(200).json({success: true, orden: mod})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({error: error.message})
        }
    }
}

export {orderController}