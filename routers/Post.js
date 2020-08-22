const express = require('express');
const router = express.Router();
const { Post } = require('../models/post');
const { Catagory } = require('../models/catagory');

router.get('/', async (req, res) => {
  const posts = await Post.find().sort('title');
  res.send(posts);
});

router.post('/', async (req, res) => {
  let post = new Post({
    title: req.body.title,
    catagory: req.body.catagory,
    body: req.body.body,
  });
  await post.save();
  res.send(post);
});

router.put('/:id', async (req, res) => {
  let post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      catagory: req.body.catagory,
      body: req.body.body,
    },
    { new: true }
  );

  if (!post)
    return res.status(404).send('The post with the given ID was not found.');
  res.send(post);
});

router.delete('/:id', async (req, res) => {
  let post = await Post.findByIdAndDelete(req.params.id);
  if (!post)
    return res.status(404).send('The post with the given ID was not found.');
  res.send(post);
});

module.exports = router;
