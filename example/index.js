const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // load index.html
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000/`);
});