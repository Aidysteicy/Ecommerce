class carritoDto{
    constructor({ email, fecha, productos, entrega}){
      this.email = email
      this.fecha = fecha
      this.productos = productos
      this.entrega = entrega
    }
  }
  
  export default function(data){
    if(Array.isArray(data)) return data.map(elem => new carritoDto(elem))
    return new carritoDto(data)
  }