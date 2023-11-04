
const deleteBoard = async ({boardId, userId}) => {
    const data = {"board_id":boardId,"user_id":userId};
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/deleteBoard`, {
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
        throw new Error(`Cannot delete Board! ${err}`);
    }
};

module.exports = deleteBoard;