const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// MongoDB bağlantı URI'si - Daha esnek ve güvenli bir yaklaşım
const getMongoURI = () => {
  // Önce environment variable'ı kontrol et
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  // Environment'a göre host seçimi
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : 'mongodb';
  const port = process.env.MONGODB_PORT || '27017';
  const dbName = process.env.MONGODB_DB_NAME || 'notlar';

  return `mongodb://${host}:${port}/${dbName}`;
};

const mongoURI = getMongoURI();
console.log('Connecting to MongoDB at:', mongoURI);

// MongoDB bağlantısı
mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // 5 saniye içinde bağlanamazsa hata ver
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Kritik bir hata olduğu için uygulamayı sonlandır
    process.exit(1);
  });

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
