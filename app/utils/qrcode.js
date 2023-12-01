const QRCode = require('qrcode');

module.exports = {
    async generate(data, filename) {
        try {
            const qrCode = await QRCode.toFile(filename, data);
            console.log(`QR Code telah dibuat dan disimpan di ${filename}`);
            return true;
        } catch (error) {
            console.error('Error generating QR Code:', error);
            return false;
        }
    }
}