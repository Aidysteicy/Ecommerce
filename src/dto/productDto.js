class prodDto{
    constructor({ _id, nombre, descripcion, codigo, categoria, precio, foto, stock}){
      this._id = _id,
      this.nombre = nombre,
      this.descripcion = descripcion,
      this.codigo = codigo,
      this.categoria = categoria,
      this.precio = precio,
      this.foto = foto,
      this.stock = stock
    }
  }
  
  export default function(data){
    if(Array.isArray(data)) return data.map(elem => new prodDto(elem))
    return new prodDto(data)
  }