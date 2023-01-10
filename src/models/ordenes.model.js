import { Schema, model } from 'mongoose'

const ordenesSchema = new Schema({
    orden: {
        type: Object,
        required: true,
    },
    fecha: {
        type: Date,
        default: new Date(),
    },
    items: {
        type: Array,
        required: true,
    },
    estado: {
        type: String,
        default: 'Generada'
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
})

export default model('Ordenes', ordenesSchema)