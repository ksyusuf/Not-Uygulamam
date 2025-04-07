# Geliştirici Kılavuzu

## Yeni Özellik Geliştirme Süreci

Bu dokümantasyon, projeye yeni özellik eklemek isteyen geliştiriciler için hazırlanmıştır.

### 1. Geliştirme Ortamının Hazırlanması

#### Docker Compose ile Hızlı Başlangıç
```sh
# Projeyi klonlayın
git clone [repo-url]

# Proje dizinine gidin
cd [proje-dizini]

# Docker Compose ile tüm servisleri başlatın
docker-compose up --build
```

#### Manuel Geliştirme Ortamı
Alternatif olarak, servisleri ayrı ayrı çalıştırabilirsiniz:

```sh
# Server'ı başlatın
cd server
npm install
npm run dev

# Yeni bir terminal açın ve client'ı başlatın
cd client
npm install
npm run dev
```

### 2. Geliştirme Süreci

1. **Yeni Branch Oluşturma**
   ```sh
   git checkout -b feature/yeni-ozellik-adi
   ```

2. **Geliştirme ve Test**
   - Yeni özelliğinizi geliştirin
   - Unit testlerinizi yazın
   - Lokal ortamda testlerinizi çalıştırın
   - Kodunuzu lint kurallarına uygun hale getirin

3. **Değişiklikleri Commit Etme**
   ```sh
   git add .
   git commit -m "feat: yeni özellik açıklaması"
   ```

4. **Staging'e Push ve PR Açma**
   ```sh
   git push origin feature/yeni-ozellik-adi
   ```
   - GitHub üzerinden `staging` branch'ine PR açın
   - PR açıklamasında:
     - Yapılan değişiklikleri detaylı açıklayın
     - Test sonuçlarını ekleyin
     - Varsa ekran görüntüleri ekleyin

### 3. Code Review ve Deployment

1. **Code Review Süreci**
   - Admin tarafından PR incelenecek
   - Gerekli düzeltmeler istenebilir
   - Tüm kontroller başarılı olmalı

2. **Staging'e Merge**
   - PR onaylandıktan sonra staging'e merge edilir
   - Otomatik testler çalışır
   - Staging ortamında test edilir

3. **Production'a Deployment**
   - Staging'deki değişiklikler başarılı olduktan sonra
   - Admin tarafından main branch'e merge edilir
   - Otomatik olarak production ortamına deploy edilir

### 4. Önemli Notlar

- Her zaman güncel `main` branch'inden yeni branch oluşturun
- Commit mesajlarınızı [Conventional Commits](https://www.conventionalcommits.org/) standardına uygun yazın
- Test coverage'ını koruyun ve yeni testler ekleyin
- PR açmadan önce tüm testlerin başarılı olduğundan emin olun
- Kod review sürecinde yapılan yorumları dikkate alın 