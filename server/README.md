# Not Tutma Uygulaması - Server

Bu projenin server kısmı <b>NodeJS</b> kullanılarak geliştirilmiştir. RESTful Api, Express.js kullanılarak oluşturulmuştur ve CRUD işlemlerini desteklemektedir. Sunucu localhost'unuzun 5000 portunda çalışmaktadır. CRUD işlemleri için sağlanan endpoint _/api/notes_ altındadır.

## Gereksinimler

* Node.js (v14.x veya üzeri)
* NPM (Node Package Manager)
* MongoDB

## Kurulum

### 1. Repository Klonlanması (Eğer klonlamadıysanız)

```conding
git clone https://github.com/ksyusuf/percon.io-case-study.git
cd percon.io-case-study/server
```

### 2. Bağımlılıkların Yüklenmesi

Projeyi çalıştırabilmek için gerekli olan bağımlılıkları yükleyin. Projenin Server dizininde olduğunuzdan emin olun.

```conding
npm install
```
#### MongoDB Kurulumu

Veritabanı MongoDB ile oluşturulduğundan, bilgisayarınızda MongoDB'nin kurulu olduğundan emin olun. 
* <a rel="noopener" target="_new" href="https://www.mongodb.com/try/download/community">MongoDB Community Server</a> sayfasına gidin.
* İşletim sisteminizi seçin ve "msi" dosyasını indirin.
* İndirilen .msi dosyasını çalıştırın.
* Kurulum sihirbazındaki adımları takip edin.
* "Complete" kurulumu seçin.
* "Install MongoDB as a Service" seçeneğini aktif tutun.
* MongoDB çalıştırın.


### 3. Örnek Veri Yüklenmesi

Projenin kontrolü için örnek veri, proje içerisindeki ```seed-one-time-relationship.js``` ile kurulmalıdır. Sunucu başlatılmadan önce örnek veri kurulumu yapmanız tavsiye edilmektedir.

```conding
node seed-one-time-relationship.js
```

### 4. Sunucu Başlatılması

Sunucuyu çalıştırmak için aşağıdaki komutu kullanabilirsiniz.

```conding
node index.js
```

### Endpoints

Sunucunuzun endpoint'lerini gözden geçirmek isterseniz;

Sunucu ana dizini: <a rel="noopener" target="_new" href="http://localhost:5000/">http://localhost:5000/</a>

CRUD işlemleri dizini: <a rel="noopener" target="_new" href="http://localhost:5000/api/notes">http://localhost:5000/api/notes</a>