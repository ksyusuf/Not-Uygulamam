const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// MongoDB bağlantı URI'si
const mongoURI = 'mongodb://localhost:27017/notlar';

// MongoDB bağlantısı
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Sadece bu kökenden gelen istekler kabul edilir.
  // origin olmadığı durumda network hatası verir.
}));
app.use(express.json());

// Routes
const noteRouter = require('./routes/Note'); // Routes klasöründeki Note.js'i ekleyin
app.use('/api/notes', noteRouter);

// Sunucuyu başlat
app.listen(port, () => console.log(`Server running on port ${port}`));
