const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Get the expiration duration from the environment variable, ensuring it's a valid number
    const cookieExpireDuration = process.env.COOKIE_EXPIRE ? parseInt(process.env.COOKIE_EXPIRE, 10) : 1; // Default to 1 day if COOKIE_EXPIRE is not defined or invalid

    // Calculate the expiration date
    const expirationDate = new Date(Date.now() + cookieExpireDuration * 24 * 60 * 60 * 1000);

    // Options for the cookie
    const options = {
        expires: expirationDate,
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
