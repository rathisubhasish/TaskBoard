const logout = async () => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`,{
            method: "POST",
            credentials: "include",
        });
        return await res.json();
    } catch(err) {
        throw new Error(`Cannot LOGOUT! ${err}`);
    }
};

module.exports = logout;