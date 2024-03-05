import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt"

import { responseApi } from "../config/response.js";
import { checkTokenRef, createToken, createTokenRef, dataToken } from "../config/jwt.js";

const model = initModels(sequelize);

const signUp = async (req, res) => {
    try {
        let { userName, email, password, age, avatar } = req.body;

        let newUser = {
            userName: userName,
            email: email,
            password: bcrypt.hashSync(password, 10),
            age: age,
            avatar: avatar,
            face_app_id: "",
            role: "USER"
        }

        let checkEmail = await model.user.findOne({
            where: {
                email: email
            }
        })

        if (checkEmail) {
            responseApi(res, 400, "", "Email has exist")
            return;
        }

        await model.user.create(newUser)

        responseApi(res, 200, "", "Success")
    } catch(err) {
        responseApi(res, 500, "", "Unsuccess")
        console.log(err);
    }
}

const login = async (req, res) => {
    let { email, password } = req.body

    let checkEmail = await model.user.findOne({
        where: {
            email: email,
        }
    })

    if (checkEmail) {
        if (bcrypt.compareSync(password, checkEmail.password)) {
            let key = new Date().getTime()
            let token = createToken({ userId: checkEmail.dataValues.userId, key });
            let tokenRef = createTokenRef({ userId: checkEmail.dataValues.userId, key });

            checkEmail.dataValues.refresh_token = tokenRef

            await model.user.update(checkEmail.dataValues, {
                where: {
                    userId: checkEmail.dataValues.userId
                }
            })
            responseApi(res, 200, token, "Login Success")

        } else {
            responseApi(res, 400, "", "Wrong password")
        }
    } else {
        responseApi(res, 400, "", "Wrong email")
    }
}

const checkEmail = async (req, res) => {
    let { email } = req.params

    let checkEmail = await model.user.findOne({
        where: {
            email: email,
        }
    })

    if (checkEmail) {
        //create a code by a string of date
        //return the type of milisecond from 01/01/1970
        let code = new Date().getTime();

        let newcode = {
            code,
            expired: new Date()
        }
        await model.code.create(newcode)

        //send the code to user email
        // yarn add nodemailer
        let transfor = nodemailer.createTransport({
            auth: {
                user: "longluuduchoanglong@gmail.com",
                pass: "evfzlmdixksjdkjw"
            },
            service: "gmail"
        })

        let sendOption = {
            from: "longluuduchoanglong@gmail.com",
            to: email,
            subject: "Password Reset",
            text: "Code: " + code
        }
        transfor.sendMail(sendOption, (error, info) => { })
        responseApi(res, 200, true, "You are alright, please wait a minute")

    } else {
        responseApi(res, 200, false, "The email you have input is not exist")
    }
}

const checkCode = async (req, res) => {
    let { code } = req.params
    let checkCode = await model.code.findOne({
        where: {
            code
        }
    })

    if (checkCode) {
        //check for expired time line

        responseApi(res, 200, true, "")
    } else {
        responseApi(res, 200, false, "Invalid Code")
    }
}

const resetToken = async (req, res) => {
    let { token } = req.headers
    let decode = dataToken(token)

    //valid token checking

    //check user
    let checkUser = await model.user.findOne({
        where: {
            userId: decode.userId
        }
    })

    //check for valid refreshed token
    if (checkUser) {
        let decodeRef = dataToken(checkUser.dataValues.refresh_token)
        let checkRefToken = checkTokenRef(checkUser.dataValues.refresh_token)
        if (checkRefToken == null && decode.key == decodeRef.key) {
            //create token
            let token = createToken({ userId: checkUser.dataValues.userId, key: decodeRef.key })
            responseApi(res, 200, token, "Success !")
            return
        }
    }
    responseApi(res, 401, "", "Unauthorized")
}

export {
    login,
    signUp,
    checkEmail,
    checkCode,
    resetToken
}