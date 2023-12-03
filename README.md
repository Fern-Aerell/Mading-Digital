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

## Cara Setup Di Raspberry Pi (Dalam Pengerjaan)

1. **Update Linux**
```sh
sudo apt update -y
sudo apt upgrade -y
sudo apt-get update -y 
sudo apt-get upgrade -y
```

2. **Install Git**
```sh
sudo apt install git -y
```

3. **Install Mysql Dan Ganti Password User Root Mysql**
```sh
# Install mysql
sudo apt install mariadb-server -y

# For view mysql status
sudo service mysql status

# Start mysql
sudo service mysql start

# Stop mysql
sudo service mysql stop

# Change mysql root user password
sudo mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
exit;
```

4. **Install NodeJs 20.9.0+ Dan NPM 10.2.4+**

Sedang dalam riset.

5. **Clone & Setup project**

Clone repository github
```sh
git clone https://github.com/Fern-Aerell/Mading-Digital.git mading_digital
```

Masuk ke folder ```mading_digital```
```sh
cd mading_digital
```

Copy file ```env``` dan rename menjadi ```.env```
```sh
cp env .env
```

Edit file ```.env``` dengan nano
```sh
nano .env
```

Ubah dan uncomment beberapa hal yang ada di .env
```
# NODE_ENV=development
menjadi
NODE_ENV=production // development, production
```
```
// Uncomment database config sesuaikan dengan NODE_ENV

# PRO_DB_USER=root
# PRO_DB_PASS=
# PRO_DB_NAME=mading_digital_production
# PRO_DB_HOST=localhost
# PRO_DB_PORT=3306
# PRO_DB_DIALECT=mysql
menjadi
PRO_DB_USER=root
PRO_DB_PASS=newpassword
PRO_DB_NAME=mading_digital_production
PRO_DB_HOST=localhost
PRO_DB_PORT=3306
PRO_DB_DIALECT=mysql
```

Install semua package yang diperlukan
```sh
npm install
```

## Pembuat beserta perannya
- Aerell (Desain, Frontend, Backend)
- Reza (Desain, Frontend)
- Nico (Desain, Frontend)
- Justin (Desain, Frontend)