const User = require("../model/user");


const Signup = async (req,res) => {
    const {username, email, password} = req.body;
    try{
        const emailExists = await User.findOne({
            where: {email: email}    
        });
        if(emailExists) {
            return res.status(409).json({
                error: "Email is already registered.",
            });
        }
        // if new user, create a new user
        const newUser =  await User.create({
            username: username,
            email: email,
            password: password
        });

        // if(newUser){
        //     res.status(201).json({
        //         message: "Signup Successful, Please login to continue",
        //     });
        // }
        res.status(201).json({
            message: "Signup Successful, Please login to continue!"
        });
    }
    catch(err)
    {
        res.status(503).json({
            message: "Service Unavailable, please try later"
        });
    }
};

module.exports = Signup;