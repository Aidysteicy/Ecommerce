import bcrypt from 'bcrypt'

function createHash (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

function isValidePassword(user, password){
    return bcrypt.compareSync(password, user.password)
}

export {createHash, isValidePassword}