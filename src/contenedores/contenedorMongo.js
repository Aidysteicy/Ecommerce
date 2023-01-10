import { connect } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import {config } from '../../config.js';
import { logger } from '../utils/logger.js';

connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongo {

    constructor(modelo){
        this.modelo = modelo;
    }

    async save(objeto, nombre){
        try {
            const data = await this.getAll()
            if(data){
                await new this.modelo(objeto).save()
            }else{
                await this.modelo.createCollection(nombre)
                await new this.modelo(objeto).save()
            }
            return this.modelo(objeto)
        } catch (error) {
            logger.error('Error al guardar objeto en la BD')
        }
    }

    async saveByID(id, objeto){
        try {
            await this.modelo.updateOne({_id: id}, {$set:objeto})
            return 'ok'
        } catch (error) {
            logger.error('Error al agregar objeto en la BD')
        }
    }

    async getAll(){
        try {
            const docs = await this.modelo.find()
            return docs
        } catch (error) {
            logger.error('Error al obtener documentos')
        }
    }

    async getbyField(field){
        try {
            const doc = await this.modelo.find(field)
            return doc
        } catch (error) {
            logger.error('Error al obtener documento')
        }
    }

    async deleteById(id){
        try {
            const buscar = await this.getbyField({_id: id})
            if(buscar.length!=0 && buscar!=undefined){
                return await this.modelo.deleteOne({_id: id})
            }
            logger.error('No existe un documento con ese ID')
            return
        } catch (error) {
            logger.error('Error al eliminar documento')
        }
    }

    async deleteAll(){
        try {
            return await this.modelo.deleteMany({})
        } catch (error) {
            logger.error('Error al eliminar documentos')
        }
    }
}

export {ContenedorMongo}