const express = require('express');
const axios = require('axios');


const app = express();
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

app.post('/events', async (req, res) => {
    const { type, data} = req.body;
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }
    console.log("Received request from event bus")
    res.send("Received from request from /events")
});

app.listen(4003, () => {
  console.log('Listening on 4003, moderation server: 4003');
});
