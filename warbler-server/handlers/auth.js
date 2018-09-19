const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, nxt) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return nxt({
                status: 400,
                message: "Invalid email or password"
            })
        }
    } catch (err) {
        return nxt({
            status: 400,
            message: err.message
        })
    }
    
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