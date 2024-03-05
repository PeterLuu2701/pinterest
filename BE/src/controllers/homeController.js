import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";

import { responseApi } from "../config/response.js";

const model = initModels(sequelize);

const getAllImages = async (req, res) => {
    let { token } = req.headers;

    if (token) {
        try {
            let data = await model.picture.findAll({
                attributes: ['pictureUrl']
            });
            console.log(data);

            responseApi(res, 200, data, "Get successfully")
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "User not found")
    }
}

const findImagesByName = async (req, res) => {
    let { token } = req.headers;

    if (token) {
        try {
            let { keyword } = req.body;

            if (keyword) {
                let data = await model.picture.findAll({
                    attributes: ['pictureUrl', 'pictureName'],
                    where: {
                        pictureName: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                })
                responseApi(res, 200, data, "Get successfully")
                // data.length >= 1 ? console.log('Get successfully') : console.log('No result matched');
            } else {
                responseApi(res, 500, "", "Please input keyword")
            }
        } catch (err) {
            responseApi(res, 500, "", "Something happened")
            console.log(err);
        }
    } else {
        responseApi(res, 402, "", "User not found")
    }

}

export {
    getAllImages,
    findImagesByName
}