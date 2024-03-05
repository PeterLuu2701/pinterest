import express from 'express'
import { checkCode, checkEmail, login, resetToken, signUp } from '../controllers/authController.js';

const authRoute = express.Router();

//signup
authRoute.post('/signup', signUp)

//login
authRoute.post('/login', login)

//check email
authRoute.post('/check-email/:email', checkEmail)

//check code
authRoute.post('/check-code/:code', checkCode)

//refresh token
authRoute.post("/reset-token", resetToken)

export default authRoute