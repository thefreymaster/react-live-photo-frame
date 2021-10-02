const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 3000;
const path = require('path');

app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.use(express.static(__dirname + '/build'));

app.get("/videos/:file", (req, res) => {
    const { file } = req.params;
    res.sendFile(path.join(__dirname, '/videos', `${file}`));
})
