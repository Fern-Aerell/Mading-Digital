'use strict';

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  // Fungsi untuk menghash kata sandi
  async hash(password) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  },
  // Fungsi untuk memverifikasi kata sandi
  async compare(password, hashedPassword) {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw error;
    }
  },
};
