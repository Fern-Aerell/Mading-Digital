function base_url(value) {
    let baseUrl = window.location.protocol + "//" + window.location.host;
    if(value != undefined)
    {
        baseUrl += "/" + value;
    }
    return baseUrl;
}

class Hp {
    dynamic_island;
    notifications = [];

    getTime() {
        var date = new Date();
        var jam = date.getHours();
        var menit = date.getMinutes();
    
        // Tambahkan nol di depan jika jam atau menit kurang dari 10
        jam = jam < 10 ? '0' + jam : jam;
        menit = menit < 10 ? '0' + menit : menit;
    
        // Gabungkan jam dan menit menjadi format HH:mm
        var waktu = jam + ':' + menit;
    
        return waktu;
    }

    formatTime(value) {
        const dateTime = new Date(value);
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        return formattedTime;
    }
    
    getHariTanggal() {
        var hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        var bulanList = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        
        var date = new Date();
        var hari = hariList[date.getDay()];
        var tanggal = date.getDate();
        var bulan = bulanList[date.getMonth()];
        
        var hasil = hari + ', ' + tanggal + ' ' + bulan;
        
        return hasil;
    }

    setJam() {
        const jam_hp = document.getElementById("jam_hp");
        jam_hp.innerHTML = this.getTime();
    }

    setHariDanTanggal() {
        const hp_hari_dan_tanggal = document.getElementById("hp_hari_dan_tanggal");
        hp_hari_dan_tanggal.innerHTML = this.getHariTanggal();
    }

    setDynamicIsland(icon, text) {
        let timeout;
        
        const hp_dynamic_island_container = document.getElementById("hp_dynamic_island_container");
        const hp_dynamic_island_icon = document.getElementById("hp_dynamic_island_icon");
        const hp_dynamic_island_text = document.getElementById("hp_dynamic_island_text");

        hp_dynamic_island_icon.setAttribute("src", icon);
        hp_dynamic_island_text.innerHTML = text;
        
        hp_dynamic_island_container.classList.add("hp-dynamic-island-show");
        var audio = new Audio(base_url("assets/sounds/dynamic_island_notif.mp3"));
        audio.play();
        
        timeout = setTimeout(() => {
            hp_dynamic_island_container.classList.remove("hp-dynamic-island-show");
            clearTimeout(timeout);
        }, 10000);
    }

    async setNotification() {
        const hp_notification = document.getElementById("hp_notification");
        this.notifications = [];
        var date = new Date();
        const day = date.getDay() + 1;
        const get_activity_api_url = base_url("api/get_jadwal_with_day/" + day);
        await axios.get(get_activity_api_url)
        .then((response) => {
            const data = response["data"];
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
                        this.notifications.push(value);
                    } else {
                        // Waktu sedang berlangsung.
                        this.setDynamicIsland("upload/images/" + value.image, value.text_its_time);
                    }
                });
            }
        })
        .catch((error) => {})
        .finally(() => {
            while (hp_notification.firstChild) {
                hp_notification.removeChild(hp_notification.firstChild);
            }
            this.notifications.forEach((value) => {
                hp_notification.appendChild(this.createNotificationElement(value.id, "upload/images/" + value.image, value.title, this.formatTime(value.date), value.text));
            });
        });
    }

    createNotificationElement(id, icon, title, time, body) {
        const hp_notif_container = document.createElement("div");
        const hp_notif_head = document.createElement("div");
        const hp_notif_head_img = document.createElement("img");
        const hp_notif_head_div = document.createElement("div");
        const hp_notif_head_span_title = document.createElement("span");
        const hp_notif_head_span_time = document.createElement("span");
        const hp_notif_body = document.createElement("div");
        const hp_notif_body_p = document.createElement("p");

        hp_notif_container.appendChild(hp_notif_head);
        hp_notif_container.appendChild(hp_notif_body);

        hp_notif_head.appendChild(hp_notif_head_img);
        hp_notif_head.appendChild(hp_notif_head_div);

        hp_notif_head_div.appendChild(hp_notif_head_span_title);
        hp_notif_head_div.appendChild(hp_notif_head_span_time);

        hp_notif_body.appendChild(hp_notif_body_p);

        hp_notif_container.classList.add("hp-notif-container");
        hp_notif_container.setAttribute("id", id);
        hp_notif_head.classList.add("hp-notif-head");
        hp_notif_head_img.setAttribute("src", icon);
        hp_notif_head_img.setAttribute("alt", "icon");
        hp_notif_head_span_title.innerHTML = title;
        hp_notif_head_span_time.innerHTML = time;
        hp_notif_body.classList.add("hp-notif-body");
        hp_notif_body_p.innerHTML = body;

        return hp_notif_container;
    }
}

class QrCodeModel {

    image;
    text;

    constructor(image, text)
    {
        this.image = image
        this.text = text;
    }

    toJson()
    {
        const data = {
            image: this.image,
            text: this.text
        }

        return JSON.stringify(data);
    }

    fromJson(value)
    {
        const data = JSON.parse(value);
        this.image = data.image;
        this.text = data.text;
    }

}

class Tablet {

    qrcode;
    tompel_text;
    marquee_text = [];
    videos = [];
    currentVideoIndex = 0;

    constructor() {
        const tablet_videos = document.getElementById("tablet_videos");
        tablet_videos.addEventListener("ended", () => {
            if(this.videos.length > 0) {
                if(this.currentVideoIndex < this.videos.length - 1) {
                    this.currentVideoIndex++;
                }else{
                    this.currentVideoIndex = 0;
                }
                const tablet_video = document.getElementById("tablet_video");
                tablet_video.setAttribute("src", "upload/videos/" + this.videos[this.currentVideoIndex].video);
                tablet_videos.load();
                tablet_videos.play();
            }
        });
    }

    async setMarqueeText() {
        const get_marquee_text_api_url = base_url("api/get_marquee_text");
        const marquee_text = document.getElementById("marquee_text");
        let marquee_text_string = "";
        axios.get(get_marquee_text_api_url)
        .then((response) => {
            const data = response["data"];
            if(data.length > 0) {
                data.forEach((value) => {
                    if(marquee_text_string.length > 0) {
                        marquee_text_string += " | " + value["text"];
                    }else{
                        marquee_text_string += value["text"];
                    }
                });
            }
        })
        .catch((error) => {
            marquee_text.style.visibility = "hidden";
        })
        .finally(() => {
            if(marquee_text_string.length > 0) {
                marquee_text.innerHTML = marquee_text_string;
                marquee_text.style.visibility = "visible";
            }
        });
    }

    setQrCode() {
        const get_use_qrcode = base_url("api/get_use_qrcode");
        const tablet_qrcode_container = document.querySelector(".tablet-qrcode-container");
        const tablet_qrcode = document.getElementById("tablet_qrcode");
        const tablet_qrcode_title = document.getElementById("tablet_qrcode_title");
        axios.get(get_use_qrcode)
        .then((response) => {
            const data = response["data"];
            if(data["image"] != undefined && data["description"] != undefined) {
                this.qrcode = new QrCodeModel(`upload/qrcodes/${data["image"]}`, data["description"]);
            }
        })
        .catch((error) => {
            tablet_qrcode_container.style.display = "none";
        })
        .finally(() => {
            if(this.qrcode != null) {
                tablet_qrcode.setAttribute("src", this.qrcode.image);
                tablet_qrcode_title.innerHTML = this.qrcode.text;
                tablet_qrcode_container.style.display = "flex";
            }
        });
    }

    setVideo() {
        const get_video_api_url = base_url("api/get_video");
        axios.get(get_video_api_url)
        .then((response) => {
            const data = response["data"];
            if(data.length > 0) {
                this.videos = data;
            }
        })
        .catch((error) => {})
        .finally(() => {});
    }

    setTompel() {
        const get_tompel_api_url = base_url("api/get_tompel");
        const tablet_tompel_container = document.querySelector(".tablet-tompel-container");
        const tablet_tompel = document.querySelector(".tablet-tompel-text");
        axios.get(get_tompel_api_url)
        .then((response) => {
            const data = response["data"];
            if(data != null) {
                this.tompel_text = data.text;
            }
        })
        .catch((error) => {})
        .finally(() => {
            if(this.tompel_text != undefined)
            {
                tablet_tompel_container.style.visibility = "visible";
                tablet_tompel.innerHTML = this.tompel_text;
            }
        });
    }
}

let timeout;
const tablet = new Tablet();
const hp = new Hp();

function init()
{
    
}

function update()
{
    if(timeout != null) clearTimeout(timeout);

    hp.setJam();
    hp.setHariDanTanggal();
    tablet.setMarqueeText();
    tablet.setQrCode();
    tablet.setVideo();
    tablet.setTompel();
    hp.setNotification();

    timeout = setTimeout(update, 5000);
}

update();
init();