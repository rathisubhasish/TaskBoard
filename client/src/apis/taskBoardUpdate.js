
const taskBoardUpdate = async ({userId, boardId, myTaskId, newBoardId, taskName}) => {
    const data = {user_id: userId, board_id: boardId, task_id: myTaskId, new_board_id: newBoardId, task: taskName};
    
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/taskBoardUpdate`, {
            method:"PUT",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await res.json();

    } catch(err) {
        throw new Error(`Cannot update board! ${err}`);
    }
};

module.exports = taskBoardUpdate;