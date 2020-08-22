const express = require('express');
const router = express.Router();
const { Catagory } = require('../models/catagory');

router.get('/', async (req, res) => {
  const catagories = await Catagory.find().sort('name');
  res.send(catagories);
});

router.post('/', async (req, res) => {
  let catagory = new Catagory({ name: req.body.name });
  await catagory.save();

  res.send(catagory);
});

router.put('/:id', async (req, res) => {
  let catagory = await Catagory.findByIdAndDelete(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!catagory) res.status(400).send('The catagory is not found by this id');
  res.send(catagory);
});

router.delete('/:id', async (req, res) => {
  let catagory = await Catagory.findByIdAndRemove(req.params.id);
  if (!catagory) res.status(400).send('The catagory is not found by this id');
  res.send(catagory);
});

module.exports = router;
