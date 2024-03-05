import express from 'express'
import { findImagesByName, getAllImages } from '../controllers/homeController.js';

const homeRoute = express.Router();


homeRoute.get('/get-all-images', getAllImages)
homeRoute.get('/find-images-by-name', findImagesByName)

export default homeRoute