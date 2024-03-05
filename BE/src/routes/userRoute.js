import express from 'express'
import { deleteImageById, getCreatedImageByUserId, getSavedImageByUserId, getUser, updateProfile, uploadNewImage } from '../controllers/userController.js';

const userRoute = express.Router();


userRoute.get('/', getUser)
userRoute.get('/get-saved-by-user', getSavedImageByUserId)
userRoute.get('/get-created-images-by-user', getCreatedImageByUserId)
userRoute.post('/delete-image', deleteImageById)
userRoute.post('/upload-image', uploadNewImage)
userRoute.put('/update-profile', updateProfile)

export default userRoute