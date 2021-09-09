const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log('day la token' + token)

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.user = decoded._id
        next()
    } catch (err) {
        console.log(err)
        return res.sendStatus(403);
    }

}

module.exports = verifyToken