// Importamos la librería de jsonwebtoken
const jwt = require('jsonwebtoken');

const generateToken = (id, email) => {
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}


module.exports = {
    generateToken,
    verifyToken
};