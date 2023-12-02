const { sequelize, MarqueeTextModel, QrCodeModel, VideoModel, JadwalModel, TompelModel } = require("./database.js");

let lastJam;
let lastHariTanggal;
let lastUseQrcode;
let lastMarqueeText;
let lastVideo;
let lastJadwal;
let lastTompel;

function getJam() {
  var date = new Date();
  var jam = date.getHours();
  var menit = date.getMinutes();

  // Tambahkan nol di depan jika jam atau menit kurang dari 10
  jam = jam < 10 ? "0" + jam : jam;
  menit = menit < 10 ? "0" + menit : menit;

  // Gabungkan jam dan menit menjadi format HH:mm
  var waktu = jam + ":" + menit;

  return waktu;
}

function getHariTanggal() {
  var hariList = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  var bulanList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  var date = new Date();
  var hari = hariList[date.getDay()];
  var tanggal = date.getDate();
  var bulan = bulanList[date.getMonth()];

  var hasil = hari + ", " + tanggal + " " + bulan;

  return hasil;
}

function getDay() {
  var date = new Date();
  const day = date.getDay() + 1;
  return day;
}

async function getMarqueeText() {
  const data = JSON.parse(JSON.stringify(await MarqueeTextModel.findAll()));
  return data.map((value) => value.text).join(" | ");
}

async function getUseQrCode() {
  const data = JSON.parse(JSON.stringify(await QrCodeModel.findOne({where: {use: 1}})));
  return data;
}

async function getVideo() {
  const data = JSON.parse(JSON.stringify(await VideoModel.findAll()));
  return data;
}

async function getJadwalMatchDay() {
  const data = JSON.parse(JSON.stringify(await JadwalModel.findAll({where: sequelize.literal(`DAYOFWEEK(date) = ${getDay()}`)})));
  return data;
}

async function getTompel() {
  const data = JSON.parse(JSON.stringify(await TompelModel.findOne()));
  return data;
}

async function filterJadwal(data) {
  const result = [];
  let dynamic_island = null;
  if(data.length > 0) {
    data.forEach((value) => {
        const currentTime = new Date();
        const targetTime = new Date(value.date);
        const toleranceInSeconds = 5;
        const adjustedTargetTime = new Date(targetTime.getTime() + toleranceInSeconds * 1000);
        if (currentTime > adjustedTargetTime) {
            // Waktu sudah berlalu.
        } else if (currentTime < targetTime) {
            // Waktu belum berlalu.
            result.push(value);
        } else {
            // Waktu sedang berlangsung.
            dynamic_island = {
              image: value.image,
              text_its_time: value.text_its_time
            }
        }
    });
  }
  return {result: result, dynamic_island: dynamic_island};
}

function setDynamicIsland(io, data) {
  io.emit("dynamic_island", data);
}

async function updateJam(io) {
  const jam = getJam();
  if (lastJam != jam) {
    lastJam = jam;
    io.emit("jam", jam);
  }
}

async function updateHariTanggal(io) {
  const hariTanggal = getHariTanggal();
  if (lastHariTanggal != hariTanggal) {
    lastHariTanggal = hariTanggal;
    io.emit("hari_dan_tanggal", hariTanggal);
  }
}

async function updateMarqueeText(io) {
  const marquee_text = await getMarqueeText();
  if(lastMarqueeText != marquee_text) {
    lastMarqueeText = marquee_text;
    io.emit("marquee_text", marquee_text);
  }
}

async function updateUseQrCode(io) {
  const qrcode = await getUseQrCode();
  if(lastUseQrcode != qrcode) {
    lastUseQrcode = qrcode;
    io.emit("qrcode", qrcode);
  }
}

async function updateVideo(io) {
  const video = await getVideo();
  if(lastVideo != video) {
    lastVideo = video;
    io.emit("video", video);
  }
}

async function updateJadwal(io) {
  const filter = await filterJadwal(await getJadwalMatchDay());
  const jadwal = filter.result;
  if(lastJadwal != jadwal) {
    lastJadwal = jadwal;
    io.emit("jadwal", jadwal);
  }
  if(filter.dynamic_island != null) {
    setDynamicIsland(io, filter.dynamic_island);
  }
}

async function updateTompel(io) {
  const tompel = await getTompel();
  if(lastTompel != tompel) {
    lastTompel = tompel;
    io.emit("tompel", tompel);
  }
}

async function init(io) {
  io.emit("jam", getJam());
  io.emit("hari_dan_tanggal", getHariTanggal());
  io.emit("marquee_text", await getMarqueeText());
  io.emit("qrcode", await getUseQrCode());
  io.emit("video", await getVideo());
  io.emit("tompel", await getTompel());

  const filter = await filterJadwal(await getJadwalMatchDay());
  const jadwal = filter.result;
  io.emit("jadwal", jadwal);
  if(filter.dynamic_island != null) {
    setDynamicIsland(io, filter.dynamic_island);
  }
}

async function update(io) {
  updateJam(io);
  updateHariTanggal(io);
  updateJadwal(io);
}

module.exports = {
    init,
    update,
    updateMarqueeText,
    updateUseQrCode,
    updateVideo,
    updateJadwal,
    updateTompel
}
