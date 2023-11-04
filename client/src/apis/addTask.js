
const addTask = async ({boardId,task, userId}) => {
    const data = {"board_id": boardId, "task": task, "user_id": userId};
    
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/addTask`, {
            method:"POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await res.json();

    } catch(err) {
        throw new Error(`Cannot add Task! ${err}`);
    }
};

module.exports = addTask;