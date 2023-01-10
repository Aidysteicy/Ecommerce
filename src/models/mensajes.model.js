import { Schema, model } from 'mongoose'

const mensajesSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        default: 'usuario'
    },
    fecha: {
        type: Date,
        default: new Date(),
    },
    mensaje: {
        type: String,
        required: true,
        trim: true
    },
})

export default model('Mensaje', mensajesSchema)