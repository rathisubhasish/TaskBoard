
require("dotenv").config();
const User = require("../model/user");
const Board = require("../model/board");

const DeleteBoard = async (req,res) => {
    const {board_id, user_id} = req.body;
    if(!board_id)
    {
        return res.status(400).json({
            error: "Board Id is required",
        });
    }

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

        const boardIdExists = await Board.findOne({
            where: {board_id: board_id , user_id: user_id}    
        });

        if(!boardIdExists)
        {
            return res.status(400).json({
                error: "Board does not exists",
            });
        }

        const deleteBoard = await Board.destroy({
            where: {
                board_id: board_id
            }
        });

        res.status(201).json({
            message: "Board deleted successfully", 
        });

    }catch(err){
        console.log(err);
        res.status(503).json({
            message: "Service Unavailable, please try later"
        });
    }
};

module.exports = DeleteBoard;