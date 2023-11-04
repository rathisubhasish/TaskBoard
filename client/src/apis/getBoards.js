const getBoards = async ({ userId }) => {
    const data = { user_id: userId };
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/getBoards`, {
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
        throw new Error(`Cannot fetch boards! ${err}`);
    }
};

module.exports = getBoards;