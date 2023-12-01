const fs = require("fs/promises");
const path = require("path");

async function deleteFolderContents(folderPath) {
  try {
    // Membaca daftar file dalam folder
    const files = await fs.readdir(folderPath);

    // Menghapus setiap file
    const deletePromises = files.map(async (file) => {
      const filePath = path.join(folderPath, file);
      await fs.unlink(filePath);
      console.log(`File ${filePath} dihapus.`);
    });

    // Menunggu semua file dihapus
    await Promise.all(deletePromises);

    console.log(`Isi folder ${folderPath} berhasil dihapus.`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

const upload_folder_path = [
    "public/upload/images",
    "public/upload/qrcodes",
    "public/upload/videos"
];

upload_folder_path.forEach((item) => {
    deleteFolderContents(item);
});