const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../model/user");
const Board = require("../model/board");

const AddBoard = async (req,res) => {
    try{
        const emailExists = await User.findOne({
            where: {email: req.body.email}    
        });
        if(emailExists !== null) {
            //if user is found
            const check = await emailExists.validPassword(req.body.password,emailExists.dataValues.password);
            if(check)
                {
                    //generate a token with userId and jwt secret
                    const token = jwt.sign({email: req.body.email},process.env.JWT_SECRET,{
                        expiresIn: "2h",
                    });
    
                    //persist the token as 'jwt' in cookie with an expiry date
                    res.cookie("jwt", token, {expire: new Date() + 9999 , httpOnly: true});
                    
    
                    //return the response with user
                    const {user_id, email} = emailExists;
                    return res.status(200).json({
                        message: "Login Successful",
                        data: {"email":email, "user_id":user_id}
                    });
                }
            else
                {
                    return res.status(400).json({
                        error: "Invalid Password!",
                    });
                }
        }
        else
        {
            return res.status(400).json({
                error: "Board can not be attached!",
            });
        }
        
    }
    catch(err)
    {
        console.log(err);
        res.status(503).json({
            message: "Service Unavailable, please try later"
        });
    }
    
};

module.exports = Login;