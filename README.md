# 💧 WaterBot – WhatsApp Water Drinking Reminder
[![GitHub stars](https://img.shields.io/github/stars/W4hyuXD/water-bot?style=social)](https://github.com/W4hyuXD/Water-Bot/stargazers)
![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)
[![Support](https://img.shields.io/badge/Support-Coffe-Yellow)]()
> **WaterBot** adalah bot WhatsApp untuk membantu menjaga pola minum air putih harian, mengurangi minuman manis, dan mencatat progress kesehatan.      
Bot ini dibuat menggunakan **Node.js**, **Baileys** (WhatsApp Web API), dan **SQLite** untuk database.

## ✨ Fitur
- 📅 **Jadwal Minum Air Otomatis** (default: 06:00, 09:00, 13:00, 17:00, 21:00).
- ✅ Reminder interaktif: Minum / Tunda / Lewati.
- 📊 **Laporan harian & mingguan** (total air minum, minuman manis).
- 🧑 **Profil pengguna** (Nama, Umur, TB, BB) → dipakai untuk target minum otomatis.
- ☕ Catatan **minuman manis** (kopi, teh, jus, dll) → lengkap dengan history bulanan.
- ⚙️ Semua bisa dikontrol lewat chat (command).

---

## 📂 Struktur Project
```bash
Water-Bot/
│── package.json
│── index.js
│── config.js
│── database.js
│── scheduler.js
│── handlers/
│    ├── commandHandler.js
│    ├── profileHandler.js
│── utils/ │    ├── time.js
│    └── messages.js
└── data/ (database storage)
```

## 🚀 Instalasi
1. Clone repo:
   ```bash
   git clone https://github.com/W4hyuXD/Water-Bot.git
   cd Water-Bot
   ```
2. Install dependencies: ```npm install```
3. Jalankan bot: ```npm start```
4. Scan QR Code di terminal menggunakan WhatsApp di HP kamu.

## 💬 Command yang Tersedia
```
🔹 Profil  
    Registrasi (pertama kali chat ke bot):  
    Nama: User  
    Umur: Age  
    TB: 169  
    BB: 50  
    profil → lihat profil user  
    update profil → update data  
🔹 Jadwal & Target  
   jadwal → lihat jadwal minum aktif  
   set jadwal 06:30,12:00,20:00 → atur jadwal manual  
   set target 2500 → ubah target harian (ml)  
🔹 Progress  
  progress → lihat progress harian  
  history → lihat laporan mingguan/bulanan  
🔹 Minuman Manis  
   Kirim pesan:  
   Gw pengen minum Kopi  
   Bot otomatis mencatat & memberi peringatan.  
🔹 Bantuan 
   help → lihat daftar command  
```

## 📊 Laporan Otomatis
> Harian: Jam 22:00 bot mengirim ringkasan konsumsi air & minuman manis.    
Mingguan: Hari Minggu malam, laporan rekap mingguan.   

## 🔄 Flowchart Bot
```flowchart TD
A [Mulai Chat dengan Bot] --> B {Sudah Punya Profil?}
B -- Tidak --> C [Tanya Profil: Nama, Umur, TB, BB]
C --> D [Simpan ke Database]
B -- Ya --> E [Menunggu Input User]

E -->|Reminder Otomatis| F [💧 Ingatkan Minum Air]
E -->|User Kirim Command| G {Jenis Command?}

G -->|progress| H [📊 Kirim Progress Harian]
G -->|jadwal / target| I [⚙️ Update Jadwal/Target]
G -->|Gw pengen minum ...| J [☕ Catat Minuman Manis]
G -->|help| K [📖 Tampilkan Bantuan]

F --> L [User Pilih: Minum / Tunda / Skip]
L --> M [Catat ke Database]

J --> N [Simpan ke Sweet Logs]

H --> O [Kirim Statistik ke User]
I --> P [Update DB User]
N --> O
```

## ⚙️ Technology
>
```Node.js – runtime```   
```Baileys – WhatsApp Web API```   
```better-sqlite3 – database```   
```dayjs – date & timezone```   
```node-cron – scheduler```   

## 📌 Catatan
> Project ini hanya untuk penggunaan pribadi.    
Jangan digunakan untuk spam atau automation yang melanggar kebijakan WhatsApp.     
Database tersimpan lokal di data/waterbot.db.  

## 📸 Screenshots

## 👨‍💻 Kontribusi
> Pull Request & saran selalu diterima.     
Kalau ada bug / ide baru, silakan buat Issue.   

## 📜 Lisensi
***MIT License © 2025***

