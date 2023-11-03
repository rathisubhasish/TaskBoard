const getUser = async () => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/getUser`,{
            method: "GET",
            credentials: "include",
        });
        return await res.json();
    } catch(err) {
        throw new Error("Please login to continue!");
    }
};

module.exports = getUser;