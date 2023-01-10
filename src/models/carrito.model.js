import { Schema, model } from 'mongoose'

const carritoSchema = new Schema({
    email: {
        type: String,
    },
    fecha: {
        type: Date,
        default: new Date(),
    },
    productos: {
        type: Array,
    },
    entrega: {
        type: String,
    }
})

export default model('Carrito', carritoSchema)