
require("dotenv").config();
const User = require("../model/user");
const Board = require("../model/board");
const Task = require("../model/task");

const DeleteTask = async (req,res) => {
    const {board_id, user_id, task_id} = req.body;
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

    if(!task_id)
    {
        return res.status(400).json({
            error: "task id is required",
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
        const taskExists = await Task.findOne({
            where: {board_id: board_id , task_id: task_id}    
        });

        if(!taskExists)
        {
            return res.status(400).json({
                error: "Task does not exists",
            });
        }

        const deleteTask = await Task.destroy({
            where: {
                task_id: task_id
            }
        });

        res.status(201).json({
            message: "Task deleted successfully"
        });

    }catch(err){
        console.log(err);
        res.status(503).json({
            message: "Service Unavailable, please try later"
        });
    }
};

module.exports = DeleteTask;