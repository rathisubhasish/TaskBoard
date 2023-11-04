
require("dotenv").config();
const User = require("../model/user");
const Board = require("../model/board");

const AddBoard = async (req,res) => {
    const {board_title, user_id} = req.body;
    if(!board_title)
    {
        return res.status(400).json({
            error: "Board title is required",
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

        const boardTitleExists = await Board.findOne({
            where: {board_title: board_title , user_id: user_id}    
        });

        if(boardTitleExists)
        {
            return res.status(400).json({
                error: "Board title already used!",
            });
        }

        const newBoard = await Board.create({
            board_title: board_title,
            user_id: user_id
        });
        res.status(201).json({
            message: "Board added successfully"
        });

    }catch(err){
        console.log(err);
        res.status(503).json({
            message: "Service Unavailable, please try later"
        });
    }
};

module.exports = AddBoard;