const mongoose = require('mongoose');
const Note = require('./models/Note');  // Not modelini import ediyoruz
const Category = require('./models/Category');  // Kategori modelini import ediyoruz

// MongoDB bağlantı URI'si
const mongoURI = 'mongodb://localhost:27017/notlar';

// MongoDB bağlantısı
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

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

function getRandomDate() {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Rastgele veriler ekleme
async function seedDatabase() {
  try {
    await Note.deleteMany({});
    await Category.deleteMany({});

    const categories = ['Work', 'Personal', 'Important', 'Miscellaneous', 'Family', 'Health', 'Travel'];
    const categoryDocs = await Category.insertMany(categories.map(name => ({ name })));
    
    const notes = [];
    for (let i = 0; i < 10; i++) {
      const randomCategory = categoryDocs[Math.floor(Math.random() * categoryDocs.length)];
      notes.push({
        header: getRandomHeader(),
        content: getRandomContent(),
        category: randomCategory._id,  // Kategori ID'si ile eşleştir
        date: getRandomDate()
      });
    }

    await Note.insertMany(notes);
    console.log('10 rastgele not ve kategoriler eklendi.');
  } catch (err) {
    console.error('Veri ekleme hatası:', err);
  } finally {
    mongoose.connection.close(); // Bağlantıyı kapat
  }
}

seedDatabase();
