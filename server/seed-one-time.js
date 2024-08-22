const mongoose = require('mongoose');

// MongoDB bağlantı URI'si
const mongoURI = 'mongodb://localhost:27017/notlar';

// MongoDB bağlantısı
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Not şeması
const noteSchema = new mongoose.Schema({
  header: String,
  content: String,
  category: String,
  date: Date // Ekledim: notların tarihlerini de çeşitlendirelim
});

const Note = mongoose.model('Note', noteSchema);

// Rastgele veri oluşturma fonksiyonları
function getRandomHeader() {
  const headers = [
    'Meeting Notes',
    'Grocery List',
    'Project Plan',
    'To-Do List',
    'Reminder',
    'Event Summary',
    'Daily Journal',
    'Recipe Ideas',
    'Book Review',
    'Travel Plans'
  ];
  return headers[Math.floor(Math.random() * headers.length)];
}

function getRandomContent() {
  const contents = [
    'This is a note about something important.',
    'Don’t forget to complete the task.',
    'This is a detailed description of a project.',
    'Remember to check these items.',
    'This is a reminder for the upcoming event.',
    'A summary of today’s meeting.',
    'Items to buy at the grocery store.',
    'Plan for the next phase of the project.',
    'Thoughts on the book I just finished.',
    'Ideas for my next trip.'
  ];
  return contents[Math.floor(Math.random() * contents.length)];
}

function getRandomCategory() {
  const categories = ['Work', 'Personal', 'Important', 'Miscellaneous', 'Family', 'Health', 'Travel'];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomDate() {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Rastgele veriler ekleme
async function seedDatabase() {
  try {
    await Note.deleteMany({}); // Var olan verileri temizle

    const notes = [];
    for (let i = 0; i < 10; i++) { // Artırıldı: 10 not ekliyoruz
      notes.push({
        header: getRandomHeader(),
        content: getRandomContent(),
        category: getRandomCategory(),
        date: getRandomDate() // Ekledim: her notun rastgele bir tarihi olsun
      });
    }

    await Note.insertMany(notes);
    console.log('10 rastgele not verisi eklendi.');
  } catch (err) {
    console.error('Veri ekleme hatası:', err);
  } finally {
    mongoose.connection.close(); // Bağlantıyı kapat
  }
}

seedDatabase();
