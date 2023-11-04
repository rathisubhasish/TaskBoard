
const deleteTask = async ({boardId, userId, taskId}) => {
    const data = {"board_id":boardId,"user_id":userId , task_id: taskId};
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/deleteTasks`, {
            method:"DELETE",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await res.json();

    } catch(err) {
        throw new Error(`Cannot delete Task! ${err}`);
    }
};

module.exports = deleteTask;