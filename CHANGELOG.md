# 2.0.2.0

### Perubahan
1. Sistem sinkronisasi basis data yang sebelumnya melakukan permintaan API secara terus-menerus setiap 5 detik telah diperbarui. Kini, sistem menggunakan WebSocket/Socket.IO, di mana server dan klien menjalankan proses sinkronisasi basis data dengan interval 5 detik.

# 2.0.1.0

### Fitur Lama
1. Client menampilkan jam, hari, tanggal
2. Client menampilkan jadwal sesuai hari dan jam
3. Client menampilkan dynamic island jika ada jadwal yang sudah masuk jamnya.
4. Client menampilkan video secara berulang-ulang.
5. Client menampilkan qrcode.
6. Client menampilkan marquee text.
7. Client menampilkan text di bawah tablet.
8. Semua yang di tampilkan client akan di singkronisasi dengan database setiap 5 detik.
9. Ketika ingin masuk control panel harus login dengan akun admin.
10. Sistem login control panel sudah menggunakan session.
11. Control panel dapat mengatur jadwal, video, qrcode, marquee text dan text di bawah tablet.
12. Tombol logout di control panel.

### Perubahan
1. Merubah, merombak ulang code fitur lama menjadi kode javascript dan nodejs.