const jam_hp = document.getElementById("jam_hp");
const hp_hari_dan_tanggal = document.getElementById("hp_hari_dan_tanggal");
const marquee_text = document.getElementById("marquee_text");
const tablet_qrcode_container = document.querySelector(".tablet-qrcode-container");
const tablet_qrcode = document.getElementById("tablet_qrcode");
const tablet_qrcode_title = document.getElementById("tablet_qrcode_title");
const tablet_tompel_container = document.querySelector(".tablet-tompel-container");
const tablet_tompel = document.querySelector(".tablet-tompel-text");
const tablet_videos = document.getElementById("tablet_videos");
const tablet_video = document.getElementById("tablet_video");
const hp_notification = document.getElementById("hp_notification");

const socket = io("/websocket");
let socket_id;
videos = [];
currentVideoIndex = 0;
notifications = [];
let timeout;

socket.on("connect", () => {
    socket_id = socket.id;
});

socket.on("jam", (data) => {
    jam_hp.innerHTML = data;
});

socket.on("hari_dan_tanggal", (data) => {
    hp_hari_dan_tanggal.innerHTML = data;
});

socket.on("marquee_text", (data) => {
    if(data.length > 0) {
        marquee_text.innerHTML = data;
        marquee_text.style.visibility = "visible";
    }else{
        marquee_text.style.visibility = "hidden";
    }
});

socket.on("qrcode", (data) => {
    if(data != null) {
        tablet_qrcode.setAttribute("src", `upload/qrcodes/${data.image}`);
        tablet_qrcode_title.innerHTML = data.description;
        tablet_qrcode_container.style.display = "flex";
    }else{
        tablet_qrcode_container.style.display = "none";
    }
});

socket.on("tompel", (data) => {
    if(data.text.length > 0) {
        tablet_tompel.innerHTML = data.text;
        tablet_tompel_container.style.visibility = "visible";
    }else{
        tablet_tompel_container.style.visibility = "hidden";
    }
});

socket.on("video", (data) => {
    videos = data;
    currentVideoIndex = 0;
    tablet_video.setAttribute("src", "assets/videos/intro.mp4");
    tablet_videos.load();
    tablet_videos.play();
});

socket.on("jadwal", (data) => {
    notifications = data;
    while (hp_notification.firstChild) {
        hp_notification.removeChild(hp_notification.firstChild);
    }
    notifications.forEach((value) => {
        hp_notification.appendChild(createNotificationElement(value.id, "upload/images/" + value.image, value.title, formatTime(value.date), value.text));
    });
});

socket.on("dynamic_island", (data) => {
    setDynamicIsland("upload/images/" + data.image, data.text_its_time);
});

socket.on("disconnect", () => {
    socket_id = undefined;
});

tablet_videos.addEventListener("ended", () => {
    if(videos.length > 0) {
        if(currentVideoIndex < videos.length - 1) {
            currentVideoIndex++;
        }else{
            currentVideoIndex = 0;
        }
        tablet_video.setAttribute("src", "upload/videos/" + this.videos[this.currentVideoIndex].video);
        tablet_videos.load();
        tablet_videos.play();
    }
});

function base_url(value) {
    let baseUrl = window.location.protocol + "//" + window.location.host;
    if(value != undefined)
    {
        baseUrl += "/" + value;
    }
    return baseUrl;
}

function createNotificationElement(id, icon, title, time, body) {
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

function formatTime(value) {
    const dateTime = new Date(value);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedTime;
}

function setDynamicIsland(icon, text) {
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