const User = require("../model/user");
const Board = require("../model/board");
const Task = require("../model/task");


const TaskBoardUpdate = async (req,res) => {
    const {user_id, board_id, task_id, new_board_id, task} = req.body;
    if(!task_id)
    {
        return res.status(400).json({
            error: "Task Id is required",
        });
    }

    if(!board_id)
    {
        return res.status(400).json({
            error: "Board Id is required",
        });
    }
    if(!user_id)
    {
        return res.status(400).json({
            error: "User Id is required",
        });
    }
    if(!task)
    {
        return res.status(400).json({
            error: "task description is required",
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

        const boardExists = await Board.findOne({
            where: {board_id: board_id, user_id:user_id}    
        });

        if(!boardExists)
        {
            return res.status(400).json({
                error: "Current Board not found in the database",
            });
        }

        const newBoardExists = await Board.findOne({
            where: {board_id: new_board_id, user_id:user_id}    
        });

        if(!newBoardExists)
        {
            return res.status(400).json({
                error: "Target Board not found in the database",
            });
        }


        const taskExists = await Task.findOne({
            where: {task_id: task_id , board_id: board_id}    
        });

        if(!taskExists)
        {
            return res.status(400).json({
                error: "Task does not exists",
            });
        }


        const similarTaskExists = await Task.findOne({
            where: {task: task , board_id: new_board_id}    
        });

        if(similarTaskExists)
        {
            return res.status(400).json({
                error: "Similar task already exists in that board",
            });
        }
        

        const updateBoardId = await Task.update({ board_id: new_board_id}, {
            where: {
                board_id: board_id,
                task_id: task_id
            }
        });

        res.status(201).json({
            message: "Task Board Updated successfully",
        });

    }catch(err){
        res.status(503).json({
            message: "Service Unavailable, please try later"
        });
    }
};

module.exports = TaskBoardUpdate;