/// tek seferlik çalıştırıp veritabanına 3 adet veri girişi yapar.

const mongoose = require('mongoose');

// MongoDB bağlantı URI'si
const mongoURI = 'mongodb://localhost:27017/notlar';

// MongoDB bağlantısı
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Not şeması
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
});

const Note = mongoose.model('Note', noteSchema);

// Rastgele veri oluşturma fonksiyonları
function getRandomTitle() {
  const titles = [
    'Meeting Notes',
    'Grocery List',
    'Project Plan',
    'To-Do List',
    'Reminder'
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomContent() {
  const contents = [
    'This is a note about something important.',
    'Don’t forget to complete the task.',
    'This is a detailed description of a project.',
    'Remember to check these items.',
    'This is a reminder for the upcoming event.'
  ];
  return contents[Math.floor(Math.random() * contents.length)];
}

function getRandomCategory() {
  const categories = ['Work', 'Personal', 'Important', 'Miscellaneous'];
  return categories[Math.floor(Math.random() * categories.length)];
}

// Rastgele veriler ekleme
async function seedDatabase() {
  try {
    await Note.deleteMany({}); // Var olan verileri temizle

    const notes = [];
    for (let i = 0; i < 3; i++) {
      notes.push({
        title: getRandomTitle(),
        content: getRandomContent(),
        category: getRandomCategory(),
      });
    }

    await Note.insertMany(notes);
    console.log('3 rastgele not verisi eklendi.');
  } catch (err) {
    console.error('Veri ekleme hatası:', err);
  } finally {
    mongoose.connection.close(); // Bağlantıyı kapat
  }
}

seedDatabase();
