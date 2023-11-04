
require("dotenv").config();
const User = require("../model/user");
const Board = require("../model/board");
const Task = require("../model/task");

const AddTask = async (req,res) => {
    const {task, board_id, user_id} = req.body;
    if(!task)
    {
        return res.status(400).json({
            error: "Task is required",
        });
    }

    if(!board_id)
    {
        return res.status(400).json({
            error: "board id is required",
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

        const taskExists = await Task.findOne({
            where: {task: task , board_id: board_id}    
        });

        if(taskExists)
        {
            return res.status(400).json({
                error: "Task already acknowledged!",
            });
        }

        const newTask = await Task.create({
            task: task,
            board_id: board_id
        });
        res.status(201).json({
            message: "Task added successfully"
        });

    }catch(err){
        console.log(err);
        res.status(503).json({
            message: "Service Unavailable, please try later"
        });
    }
};

module.exports = AddTask;