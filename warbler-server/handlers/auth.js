const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = function() {
    
}

exports.signup = async function(req, res, nxt) {
    try {
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user
        let token = jwt.sign(
            {
                id,
                username,
                profileImageUrl
            }, 
            process.env.SECRET_KEY
        );
        return res.status(200).json(
            {
                id,
                username,
                profileImageUrl,
                token
            }
        );
    } catch(err) {
        if(err.code === 11000) {
            err.message = "Username and/or email is taken";
        }
        return nxt({
            status: 400,
            message: err.message
        });
    }
}