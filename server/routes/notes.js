const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET: Tüm notları al
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Yeni not ekle
router.post('/', async (req, res) => {
  const note = new Note({
    header: req.body.header,
    content: req.body.content,
    category: req.body.category,
    date: req.body.date
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: ID'ye göre not al
router.get('/:id', getNote, (req, res) => {
  res.json(res.note);
});

// PATCH: Notu güncelle
router.patch('/:id', getNote, async (req, res) => {
  if (req.body.header != null) {
    res.note.header = req.body.header;
  }
  if (req.body.content != null) {
    res.note.content = req.body.content;
  }
  if (req.body.category != null) {
    res.note.category = req.body.category;
  }

  try {
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Notu sil
router.delete('/:id', getNote, async (req, res) => {
  try {
    await res.note.remove();
    res.json({ message: 'Deleted Note' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware: ID'ye göre notu bul
async function getNote (req, res, next) {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: 'Cannot find note' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.note = note;
  next();
}

module.exports = router;
