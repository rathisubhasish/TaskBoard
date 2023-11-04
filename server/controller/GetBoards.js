
require("dotenv").config();
const User = require("../model/user");
const Board = require("../model/board");

const GetBoards = async (req,res) => {
    const {user_id} = req.body;

    if(!user_id)
    {
        return res.status(400).json({
            error: "user id is required",
        });
    }

    try{

        const userIdExists = await User.findOne({
            where: {user_id: user_id}    
        });

        if(!userIdExists)
        {
            return res.status(400).json({
                error: "User ID not found in the database",
            });
        }

        const collectAllBoard = await Board.findAll({
            where: {user_id: user_id},
            attributes: ['board_id', 'board_title'],    
        })
        
        res.status(200).json({data: collectAllBoard});

    }catch(err){
        console.log(err);
        res.status(503).json({
            message: "Service Unavailable, please try later"
        });
    }
};

module.exports = GetBoards;