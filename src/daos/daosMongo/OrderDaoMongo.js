import { ContenedorMongo } from '../../contenedores/contenedorMongo.js';
import Orden from '../../models/ordenes.model.js';

class OrderDaoMongo extends ContenedorMongo{

    constructor(){
        super(Orden)
    }

    async generate (car) {
        let all = await this.getAll()
        let cant
        const items = this.convertir(car.productos)
        all===undefined || all.length===0 ? cant=0 : cant=all.length
        const newOrder = {
          orden: cant + 1,
          items: items,
          email: car.email
        };
        await this.save(newOrder, 'ordenes');
        return newOrder
      };

    convertir(prod){
        const items = []
        prod.forEach(elem => {
            let input = `${elem.cantidad} x ${elem.nombre}(cod:${elem.codigo}) $${elem.precio}`
            items.push(input)
        });
        return items
    }

}

export {OrderDaoMongo}
