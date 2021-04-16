const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('sending post')
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event)

    res.send({status: 'ok'});
});

app.listen(4005, () => {
    console.log("Listening on event bus");
})