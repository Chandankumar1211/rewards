const express = require('express');
const port = 5000;
const app = express();
const index = require('./routes/index');
const jsonParser = express.json()

//Enable CORS
app.use(function (req, res, next) {
    var origin = req.headers.origin;
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(jsonParser);
app.use('/', index);

//Run the server at 5000 port
app.listen(port, () =>
    console.log(`App listening on port ${port}!`),
);