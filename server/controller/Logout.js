const Logout = (_,res) => {
    // clear the cookie
    res.clearCookie("jwt");

    return res.json({
        message: "logout Successfully",
    });
};

module.exports = Logout;