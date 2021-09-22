const express = require('express');

// Constants
const PORT = process.env.PORT || 8080;

//Application
const app = express();
app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})