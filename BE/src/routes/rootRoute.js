//manage the endpoint objects
import express from 'express'
import authRoute from './authRoute.js';
import homeRoute from './homeRoute.js';
import detailRoute from './detailRoute.js';
import userRoute from './userRoute.js';

const rootRoute = express.Router();

rootRoute.use('/auth', authRoute)
rootRoute.use('/home', homeRoute)
rootRoute.use('/detail', detailRoute)
rootRoute.use('/user', userRoute)

export default rootRoute