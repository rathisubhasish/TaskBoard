
const addBoard = async ({boardTitle, userId}) => {
    const data = {board_title: boardTitle,user_id: userId};
    
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/addBoard`, {
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
        throw new Error(`Cannot add Board! ${err}`);
    }
};

module.exports = addBoard;