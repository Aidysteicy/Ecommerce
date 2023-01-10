import model from '../models/carrito.model.js'

const postNew = async (req, res, next) => {
  const username = req.user
  //console.log(username)
  const buscaCar = await model.findOne({email: username.email})
  if(!buscaCar) {
    const newCarData = {
      email: username.email,
      productos: [],
      entrega: username.address
    }
    await new model(newCarData).save()
  }
  return next()
}

const validarProd = async (req,res,next) => {
  await model.findOne({email:req.user[0].email})
    .then(resp => {
      if(resp){
        const findProd = resp.productos.some(elem => elem.prodId.toString() === req.params.prodId)
        if(!findProd) return res.status(404).json({error: 'product not found'})
        return next()
      }
      return res.status(500).json({error: "carrito no existe"})
    }).catch(err => res.staus(500).json({error: err.message}))
}

export { postNew, validarProd}