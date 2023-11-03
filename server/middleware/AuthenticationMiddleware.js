const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) => {
    let accesstoken = req.cookies.jwt;
    // if there is no token , it is unauthorized
    if(!accesstoken)
    {
        return res.status(401).json({
            error: "You are unauthorised, token has been expired, Please Login Again!",
        });
    }

    
    let payload;
    try{
        // verify the token jwt.verify
        // throws an error if token has expired or has invalid signature
        payload = jwt.verify(accesstoken,process.env.JWT_SECRET);
        req.email = payload.email;  
        next();
    } catch (e) {
        // return req unauthorized error
        return res.status(401).json({
            error: "You are unauthorised, token has been expired , Please Login Again!",
        });
    }
}