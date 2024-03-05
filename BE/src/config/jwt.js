// yarn add jsonwebtoken
import jwt from 'jsonwebtoken'
import { responseApi } from './response.js'

// create token 
export const createToken = (data) => jwt.sign(data, 'secrect', { algorithm: 'HS256', expiresIn: '5m' })


// check token
export const checkToken = (token) => jwt.verify(token, 'secrect', (err, docode) => err)

export const createTokenRef = (data) => jwt.sign(data, 'secrect', { algorithm: 'HS256', expiresIn: '7d' })


// check token
export const checkTokenRef = (token) => jwt.verify(token, 'secrect', (err, docode) => err)


// decode tokwn 
export const dataToken = (token) => jwt.decode(token)

export const middleWareToVerifyToken = (req, res, next) => {
    let { token } = req.headers
    let check = checkToken(token)
    if (check == null) {
        next()
    } else {
        responseApi(res, 401, "", check)

    }
}