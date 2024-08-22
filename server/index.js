const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// MongoDB bağlantı URI'si
const mongoURI = 'mongodb://localhost:27017/notlar';

// MongoDB bağlantısı
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const noteRouter = require('./routes/notes');
// bu şekilde bir ana dizin altında yapılabilecek işlemlerin olduğu bir url oluşturduk.
app.use('/api/notes', noteRouter);
// bu dizinin ana erişim kısmını düzenledik
// bu dizin altındaki route'lara erişim sağlayıp işlem yapabileceğiz.

app.get('/', (req, res) => {
  res.send('Selamlar!');
});

// not ekleme
app.post('/api/notes', (req, res) => {
  const newNote = { ...req.body, id: notes.length + 1 };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
