const getTasks = async ({ userId, boardId}) => {
    const data = { user_id: userId , board_id: boardId};
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/getTasks`, {
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
        throw new Error(`Cannot fetch tasks! ${err}`);
    }
};

module.exports = getTasks;