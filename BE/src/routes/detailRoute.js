import express from 'express'
import { comment, getImageComment, getImageDetail, getSaveStatus } from '../controllers/detailController.js';

const detailRoute = express.Router();


detailRoute.get('/get-image-detail-by-id/:pictureId', getImageDetail)
detailRoute.get('/get-comment-by-picture-id/:pictureId', getImageComment)
detailRoute.get('/get-saved/:pictureId', getSaveStatus)
detailRoute.post('/comment', comment)

export default detailRoute