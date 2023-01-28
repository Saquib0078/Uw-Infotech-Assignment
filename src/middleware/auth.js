const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const userModel = require("../models/userModel")

//*******************Authentication*************************** */

const Authentication = async function (req, res, next) {
    try {

        let token = req.headers["authorization"]
        if (!token) {
            return res.status(401).send({ status: false, message: "Token is required" })
        }
        // console.log(token)

        let finalToken = token.split(" ")
        //console.log(finalToken)

        let newToken = finalToken.pop()
        //console.log(newToken )

        jwt.verify(newToken, "uw-infotech-pvt", function (error, decodedToken) {
            if (error) {
                let message = error.message == "jwt expired" ? "token expired , please Login Again!!!" : "invalid Token"
                return res.status(400).send({ status: false, message: message })
            }

            req.decodedToken = decodedToken;  //this line for we can access this token outside the middleware

            next()
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports={Authentication}