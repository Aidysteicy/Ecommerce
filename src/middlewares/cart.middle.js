import model from '../models/carrito.model.js'

const postNew = async (req, res, next) => {
  try {
    const username = req.user
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
  } catch (error) {
    logger.error(error)
  }
}

export { postNew}