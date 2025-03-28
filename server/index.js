const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5000;

// MongoDB bağlantı URI'si - Daha esnek ve güvenli bir yaklaşım
const getMongoURI = () => {
  // Önce environment variable'ı kontrol et
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  // Environment'a göre host seçimi. proccess, .env içe aktarımını beklemez.
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : 'mongodb';
  const port = process.env.MONGODB_PORT || '27017';
  const dbName = process.env.MONGODB_DB_NAME || 'notlar';
  return `mongodb://${host}:${port}/${dbName}`;
};

let mongoURI = getMongoURI();

// mongoURI = 'mongodb://localhost:27017/notlar';
// mongoURI = 'mongodb+srv://deneme-user:deneme-user-pass@notlar.mlgi8yn.mongodb.net/notlar?retryWrites=true&w=majority&appName=notlar';
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

// CORS ayarları (production için)
const allowedOrigins = [
  'https://not-uygulamasi-client.vercel.app',
  'http://localhost:3000' // Geliştirme ortamı için
];

const corsOptions = {
  origin: [
    'https://not-uygulamasi-client.vercel.app',
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));


// Routes
const noteRouter = require('./routes/notes');
// bu şekilde bir ana dizin altında yapılabilecek işlemlerin olduğu bir url oluşturduk.
app.use('/api/notes', noteRouter);
// bu dizinin ana erişim kısmını düzenledik
// bu dizin altındaki route'lara erişim sağlayıp işlem yapabileceğiz.

app.get('/', (req, res) => {
  res.send('Selamlar!');
});

// Test endpoint'i
app.get('/api/test', (req, res) => {
  res.json({ message: "CORS çalışıyor!" });
});

// Test Endpoint'i (Mutlaka ekleyin)
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', version: '1.0.0' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
