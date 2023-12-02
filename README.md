# Mading Digital

Ini adalah sebuah inovasi teknologi yang dirancang untuk memodernisasi konsep tradisional dari mading sekolah.

| Konten |
| ------ |
| [Teknologi yang Digunakan](#teknologi-yang-digunakan) |
| [Fitur Utama](#fitur-utama) |
| [Persyaratan Yang Dibutuhkan](#persyaratan-yang-dibutuhkan) |
| [Pembuat beserta perannya](#pembuat-beserta-perannya) |
| [CHANGELOG](CHANGELOG.md) |

## Teknologi yang Digunakan
1. **NodeJs:** 
   - Digunakan sebagai platform runtime untuk menjalankan aplikasi.
   - Memungkinkan pengembang untuk mengeksekusi JavaScript di sisi server.

2. **NPM (Node Package Manager):** 
   - Mengelola dependensi JavaScript untuk proyek ini.
   - Mempermudah instalasi, pembaruan, dan penghapusan pustaka pihak ketiga.
   - Package yang digunakan :
        - sequelize
        - bcrypt
        - dotenv
        - ejs
        - express
        - express-fileupload
        - express-session
        - moment
        - mysql2
        - qrcode
        - socket.io

3. **MySQL:** 
   - Sistem manajemen basis data yang digunakan untuk:
     - Menyimpan dan mengelola data terkait video.
     - Menyimpan dan mengelola data terkait QR code.
     - Menyimpan dan mengelola teks marquee berita.
     - Menyimpan dan mengelola jadwal kegiatan sekolah.

4. **HTML, CSS, dan JavaScript:** 
   - HTML: Membangun struktur halaman web.
   - CSS: Mengatur tata letak dan gaya halaman web untuk tampilan yang menarik.
   - JavaScript: Menambahkan interaktivitas dan memastikan antarmuka pengguna responsif.
   - Bersama-sama, teknologi ini mendukung pembuatan antarmuka pengguna yang menarik dan optimal bagi pengguna.

## Fitur Utama
1. **Tampilan Video:** Mading Digital ini memungkinkan untuk menampilkan video secara langsung, memberikan dimensi multimedia pada informasi yang disampaikan.

2. **QR Code:** Memberikan kemudahan akses dengan menyematkan QR code, memungkinkan pengguna untuk mengakses informasi lebih lanjut dengan mudah.

3. **Marquee Text Berita:** Menghadirkan teks berita yang bergerak, memastikan bahwa informasi terkini dan penting mendapatkan perhatian maksimal.

4. **Jadwal Kegiatan Sekolah:** Secara otomatis menampilkan jadwal kegiatan sekolah sesuai dengan hari yang berlaku, memberikan panduan waktu yang mudah diakses.

5. **Control Panel:** Sebuah antarmuka pengguna yang dapat diakses dengan mudah untuk mengelola konten. Control panel ini memungkinkan pengguna untuk memperbarui data dalam database, mengganti tampilan, dan membuat perubahan lainnya.

6. **Otomatisasi Perubahan:** Setiap perubahan yang dilakukan melalui control panel akan langsung tercermin pada tampilan Mading Digital. Proses otomatisasi ini memastikan keakuratan dan konsistensi informasi.

Proyek "Mading Digital" tidak hanya memberikan sentuhan modern pada tradisi mading sekolah, tetapi juga meningkatkan efisiensi dalam menyampaikan informasi. Dengan kombinasi teknologi terkini dan manajemen yang efektif melalui control panel, proyek ini membawa pendekatan yang inovatif dan responsif dalam mengelola informasi sekolah.

## Persyaratan Yang Dibutuhkan
- Mysql 5.1+
- NodeJs 20.9.0+
- NPM 10.2.4+

## Pembuat beserta perannya
- Aerell (Desain, Frontend, Backend)
- Reza (Desain, Frontend)
- Nico (Desain, Frontend)
- Justin (Desain, Frontend)