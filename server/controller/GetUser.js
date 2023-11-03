
const GetUser = async (req,res) =>{
    const {email, user_id} = req;
    console.log(user_id);
    return res.status(200).json({
        message: "user is still logged in",
        data: {"email": email}
    });
};

module.exports = GetUser;