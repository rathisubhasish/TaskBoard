
require("dotenv").config();
const Board = require("../model/board");
const Task = require("../model/task");

const GetTasks = async (req,res) => {
    const {user_id, board_id} = req.body;

    if(!user_id)
    {
        return res.status(400).json({
            error: "user id is required",
        });
    }
    if(!board_id)
    {
        return res.status(400).json({
            error: "board id is required",
        });
    }

    try{

        const boardIdExists = await Board.findOne({
            where: {board_id: board_id,user_id: user_id}    
        });

        if(!boardIdExists)
        {
            return res.status(400).json({
                error: "Board ID not found in the database",
            });
        }

        const collectAllTask = await Task.findAll({
            where: {board_id: board_id},
            attributes: ['board_id', 'task', 'task_id'],    
        })
        
        res.status(200).json({data: collectAllTask});

    }catch(err){
        console.log(err);
        res.status(503).json({
            message: "Service Unavailable, please try later"
        });
    }
};

module.exports = GetTasks;