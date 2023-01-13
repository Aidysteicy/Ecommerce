import fs from 'fs';

class ContenedorProducto {

    constructor( ruta){
        this.ruta = ruta;
        this.fs = fs.promises;
    }

    async save(objeto){
        let id = 1
        try {
            let productos = await this.getAll();
            if(productos === undefined){
                productos = await this.fs.writeFile(this.ruta, JSON.stringify([{id: id, timestamp: Date.now(), ...objeto}], null, 2))
            }else{
                productos.forEach(() => {
                    if(productos.find(prod => prod.id === id)){
                        id++;
                    }
                });
            await this.fs.writeFile(this.ruta, JSON.stringify([...productos, {id: id, timestamp: Date.now(), ...objeto}], null, 2))
            }
        return id;
        } catch (error) {
            logger.error(error)
        }
    }

    async saveByID(id, objeto){
        try {
            let productos = await this.getAll();
            const prodID = productos.findIndex(prod => prod.id === id)
            if(prodID!==-1){
                productos[prodID]={id:id, timestamp: Date.now(), ...objeto}
                await this.fs.writeFile(this.ruta, JSON.stringify(productos, null, 2))
                return {msg: 'Elemento Modificado', prod: productos[prodID]}
            }else{
                return {error: 'Elemento no encontrado'}
            }
        } catch (error) {
            logger.error(error)
        }
    }

    async getbyId(id){
        try {
            const productos = await this.getAll();
            const prodID = productos.find(prod => prod.id === id)
            if(prodID){
                return prodID; 
            }
            return {error: 'No existe un elemento con ese ID'}
        } catch (error) {
            logger.error(error)
        }
        
    }

    async getAll(){
        try {
            const productos = await this.fs.readFile(this.ruta, 'utf-8');
            const prodJson = JSON.parse(productos);
            return prodJson;
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteById(id){
        try {
            const productos = await this.getAll();
            const prodID = productos.find(prod => prod.id === id)
            if(prodID){
                const nuevos_productos = productos.filter(prod => prod.id !== id)
                await this.fs.writeFile(this.ruta, JSON.stringify(nuevos_productos, null, 2))
                return {msg: 'Elemento Eliminado', prod: prodID}
            }else{
                return {error: 'Elemento no encontrado'}
            }
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteAll(){
        try {
            await this.fs.writeFile(this.ruta, [])
            console.log('Todos los productos fueron borrados')
        } catch (error) {
            logger.error(error)
        }
    }

    async getIDRandom(){
        try {
            let productos = await this.getAll();
            let num = Math.floor(Math.random()*productos.length)+1;
            return await this.getbyId(num);
        } catch (error) {
            logger.error(error)
        }
    }
}

export default ContenedorProducto;