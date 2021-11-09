require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const jwt = require('jsonwebtoken');

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
})

app.use(express.json());

let refreshTokens = []
app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user) =>  {
        if(err) return res.sendStatus(403)
        const acessToken = generateAuthToken({ name: user.name })
        res.json({ acessToken: acessToken })
    })
})

app.post('/login', (req, res) => {
    // Authenticate User
    // require('crypto').randomBytes(64).toString('hex')

    const username = req.body.username
    const user = { name: username }

    const acessToken = generateAuthToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({ acessToken: acessToken, refreshToken: refreshToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAuthToken(user) { 
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'})
}

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})