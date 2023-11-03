
const User = require("../model/user");


exports.userRegisterValidator = (req,res,next) => {
    // username is not null
    req.check("username","Username is required!").notEmpty();
    
    //email is not null, valid , and normalized
    req.check("email","Email is required!").notEmpty();
    req.check("email","Invalid Email").isEmail();

    //password
    req.check("password","Password is required").notEmpty();
    req.check("password")
        .isLength({min:6})
        .withMessage("password must contain 6 characters");
    
    req.check(
        "password",
        "Password must contains one uppercase, one lowercase, one number, and one special symbol"
        ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,"i");
    
    // check for errors
    const errors = req.validationErrors();
    //if error , show the first one as it happens
    if(errors)
    {
        const firstError = errors.map((err) => err.msg)[0];
        return res.status(400).json({
            error: firstError,
        });
    }

    //proceed to next middleware
    next();
};

exports.userLoginValidator = (req,res,next) => {
    
    //email is not null, valid , and normalized
    req.check("email","Email is required!").notEmpty();
    req.check("email","Invalid Email").isEmail();

    //password
    req.check("password","Password is required").notEmpty();
    
    // check for errors
    const errors = req.validationErrors();
    //if error , show the first one as it happens
    if(errors)
    {
        const firstError = errors.map((err) => err.msg)[0];
        return res.status(400).json({
            error: firstError,
        });
    }

    //proceed to next middleware
    next();
};

