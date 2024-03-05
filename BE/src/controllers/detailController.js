import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";

import { responseApi } from "../config/response.js";
import { dataToken } from "../config/jwt.js";

const model = initModels(sequelize);

const getImageDetail = async (req, res) => {
        try {
            let { pictureId } = req.params;

            let data = await model.picture.findAll({
                where: { pictureId },
                include: [{
                    model: model.user,
                    as: 'user'
                }]
            });

            responseApi(res, 200, data, "Get successfully")
        } catch (err) {
            responseApi(res, 500, "", "Something happaned")
            console.log(err);
        }
}

const getImageComment = async (req, res) => {
    try {
        let { pictureId } = req.params;

        let data = await model.comment.findAll({
            where: { pictureId },
            include: [{
                model: model.picture,
                where: { pictureId },
                as: 'picture',
                required: false
            }]
        });
        responseApi(res, 200, data, "Get successfully")
    } catch (err) {
        responseApi(res, 500, "", "Something happaned")
        console.log(err);
    }
}

const getSaveStatus = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = dataToken(token)
    let { userId } = decodeToken || {};

    // console.log(token);
    // console.log(decodeToken);
    // console.log(userId);

    if (userId) {
        try {
            let { pictureId } = req.params;

            let data = await model.savePicture.findOne({
                where: { userId }, 
                include: [{
                    model: model.picture,
                    where: { pictureId: parseInt(pictureId) }, 
                    as: 'picture',
                    required: true 
                }]
            });

            if (data) {
                console.log('This image has been saved');
                responseApi(res, 200, data, "Get successfully");
            } else {
                console.log('This image has not been saved');
                responseApi(res, 404, null, "Image not found");
            }
        } catch (err) {
            responseApi(res, 500, "", "Something happaned")
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "Please login")
    }
}

const comment = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = dataToken(token)
    let { userId: decodedUserId } = decodeToken || {};

    console.log(token);
    console.log(decodeToken);
    console.log(decodedUserId);

    if (decodedUserId) {
        try {
            let { userId, commentContent, pictureId } = req.body;

            let commentModel = {
                userId: decodedUserId,
                commentContent,
                pictureId
            }

            await model.comment.create(commentModel);

            responseApi(res, 200, "", "Commented successfully");
        } catch (err) {
            responseApi(res, 500, "", "Something happaned")
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "Please login")
    }
}

export {
    getImageDetail,
    getImageComment,
    getSaveStatus,
    comment
}