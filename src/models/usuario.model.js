import { Schema, model } from 'mongoose'

const usuariosSchema = new Schema({
    fullname: {
        type: String,
        max: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    password: {
        type: String,
        trim: true
    },
    address: {
        type: String,
    },
    phone: {
        type: Number,
    },
})

export default model('Usuario', usuariosSchema)