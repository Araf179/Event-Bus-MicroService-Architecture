const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const  axios = require('axios');

const app = express();
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  
  console.log(req.body)
  posts[id] = {
    id,
    title: title
  };

   await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title
    }
  });
  res.status(201).send(posts[id]);
});


app.post('/events', (req, res) => {
  console.log("received Event", req.body.type);
  res.send({});
});


app.listen(4000, () => {
  console.log('v55 latest');
  console.log('Listening on post service: 4000');
});
