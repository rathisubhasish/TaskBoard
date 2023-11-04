const User = require("../model/user");

const GetUser = async (req,res) =>{
    const {email} = req;
    try{
        const emailExists = await User.findOne({
            where: {email: email},
            attributes: ['user_id', 'email'],   
        });

        return res.status(200).json({
            message: "user is still logged in",
            data: emailExists
        });

    }catch(err){
        console.log(err);
        return res.status(400).json({
            error: "Email is not found!",
        });
    }
};

module.exports = GetUser;



// https://www.youtube.com/watch?v=4AHot187Lj0