import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt"

import { responseApi } from "../config/response.js";
import { dataToken } from "../config/jwt.js";

const model = initModels(sequelize);

const getUser = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = dataToken(token)
    let { userId } = decodeToken || {};

    if (userId) {
        try {

            let data = await model.user.findAll({
                where: { userId }
            })

            responseApi(res, 200, data, "Get successfully")
        } catch (err) {
            responseApi(res, 500, "", "Something happaned")
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "Please Login")
    }
}

const getSavedImageByUserId = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = dataToken(token)
    let { userId } = decodeToken || {};

    if (userId) {
        try {

            let data = await model.savePicture.findAll({
                where: { userId },
                include: ['picture']
            })

            responseApi(res, 200, data, "Get successfully")
        } catch (err) {
            responseApi(res, 500, "", "Something happaned")
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "Please Login")
    }
}

const getCreatedImageByUserId = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = dataToken(token)
    let { userId } = decodeToken || {};

    if (userId) {
        try {

            let data = await model.picture.findAll({
                where: { userId }
            })
            responseApi(res, 200, data, "Get successfully")
        } catch (err) {
            responseApi(res, 500, "", "Something happaned")
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "Please Login")
    }
}

const deleteImageById = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = dataToken(token)
    let { userId } = decodeToken || {};

    if (userId) {
        try {
            const { pictureId } = req.body;

            const data = await model.picture.findAll({
                where: {
                    pictureId,
                    userId
                }
            })
            responseApi(res, 200, data, "Get successfully")

            if (data.length >= 1) {
                try {
                    await model.picture.destroy({
                        where: { pictureId, userId }
                    })
                    responseApi(res, 200, data, "Delete successfully")
                } catch (err) {
                    responseApi(res, 500, "", "Something happaned")
                    console.log(err);
                }
            } else {
                // res.sendStatus(200);
                console.log('Nothing to delete');
            }
        } catch (err) {
            responseApi(res, 500, "", "Something happaned")
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "Please Login")
    }
}

const uploadNewImage = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = dataToken(token)
    let { userId: decodedUserId } = decodeToken || {};

    if (decodedUserId) {
        try {
            const { pictureName, pictureUrl, pictureDescription, userId } = req.body;

            let uploadModel = {
                pictureName,
                pictureUrl,
                pictureDescription,
                userId: decodedUserId
            }

            let data = await model.picture.create(uploadModel);
            console.log(data);

            responseApi(res, 200, data, "Upload successfully")
        } catch (err) {
            responseApi(res, 500, "", "Something happaned")
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "Please Login")
    }

}

const updateProfile = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = dataToken(token)
    let { userId } = decodeToken || {};

    if (userId) {
        try {
            const { email, password, userName, age, avatar } = req.body;

            let updateModel = {};

            if (email) updateModel.email = email;
            if (password) updateModel.password = bcrypt.hashSync(password, 10);
            if (userName) updateModel.userName = userName;
            if (age) updateModel.age = age;
            if (avatar) updateModel.avatar = avatar;

            let data = await model.user.update(updateModel, {
                where: { userId }
            })

            responseApi(res, 200, data, "Update successfully")
        } catch (err) {
            responseApi(res, 500, "", "Something happaned")
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "Please Login")
    }
}

export {
    getUser,
    getSavedImageByUserId,
    getCreatedImageByUserId,
    deleteImageById,
    uploadNewImage,
    updateProfile
}