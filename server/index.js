const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // veya istediğin başka bir port
const noteRoutes = require('./routes/notes');
// CRUD işlemlerinin yapıldığı routing kısmına yönlendirir.

app.use('/api/notes', noteRoutes);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/notlar', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Basit bir route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API endpoint'leri burada tanımlanacak

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

