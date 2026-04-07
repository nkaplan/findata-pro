# FinDataPro — Financial Report Intelligence Platform

Finansal raporları (PDF) parse edip yapılandırılmış veriye dönüştüren, bankalar ve finansal kuruluşlar için tasarlanmış kurumsal web platformu.

## Özellikler

- **3 Yıllık Karşılaştırmalı Analiz** — 2022, 2023, 2024 verileri yan yana, sparkline trend grafikleri ve YoY değişim yüzdeleri
- **Inline Düzenleme** — Tüm finansal tablolardaki hücrelere tıklayarak değer düzenleyebilirsiniz
- **Değişiklik Yönetimi** — Yapılan düzenlemeleri toplu kaydetme veya geri alma
- **Kurumsal Login** — Banka/finans kuruluşu bazlı kimlik doğrulama
- **PDF Yükleme Pipeline** — 5 aşamalı otomatik işleme (PDF Parse → OCR → XBRL → TMS 29 → Validate)
- **TMS 29 Desteği** — Yüksek enflasyon düzeltmeli finansal raporlama

## Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## Demo Giriş Bilgileri

| E-posta | Şifre | Kurum |
|---------|-------|-------|
| demo@demo.com | demo123 | Demo Banka |
| demo@garanti.com.tr | Garanti2024! | Garanti BBVA |
| analyst@isbank.com.tr | IsBank2024! | İş Bankası |

## Vercel'e Deploy

### Yöntem 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Yöntem 2: GitHub Entegrasyonu
1. Bu projeyi GitHub'a push edin
2. [vercel.com](https://vercel.com) adresinden "New Project" tıklayın
3. GitHub reposunu seçin
4. Framework: **Vite** otomatik algılanır
5. "Deploy" tıklayın

### Yöntem 3: Manual Upload
1. `npm run build` çalıştırın
2. Oluşan `dist/` klasörünü Vercel dashboard'a sürükleyin

## Netlify'a Deploy

### Yöntem 1: Netlify CLI
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Yöntem 2: GitHub Entegrasyonu
1. [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
2. Build command: `npm run build`
3. Publish directory: `dist`

## Proje Yapısı

```
findata-pro/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx          # React entry point
│   ├── index.css          # Global styles
│   ├── App.jsx            # Login + Dashboard
│   ├── components.jsx     # UI bileşenleri
│   └── data.js            # Finansal veri & sabitler
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Teknolojiler

- **Vite** — Build tool
- **React 18** — UI framework
- **DM Sans / DM Mono / Playfair Display** — Typography
- **Pure SVG** — Charts & sparklines (sıfır bağımlılık)

## Lisans

MIT
