const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors');
const path = require('path');
const post = require('./routers/Post');
const catagory = require('./routers/Catagory');

//database connect
mongoose
  .connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('error raise', err));

//middleware
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello');
});
//Routes

app.use('/post', post);
app.use('/catagory', catagory);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server start at ${port}..`);
});
