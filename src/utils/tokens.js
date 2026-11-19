const jwt = require('jsonwebtoken');
const crypto = require('crypto');
function accessToken(user) { return jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m' }); }
function refreshToken(user) { return jwt.sign({ sub: user._id, tokenType: 'refresh' }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d' }); }
function hashToken(token) { return crypto.createHash('sha256').update(token).digest('hex'); }
module.exports = { accessToken, refreshToken, hashToken };
