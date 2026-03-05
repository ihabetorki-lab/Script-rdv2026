// ==UserScript==
// @name         TORKI Mosaic WORKING
// @match        https://appointment.mosaicvisa.com/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const TOKEN = "8772780105:AAEMs0FTIoHT5QZuTNOt19sn40VYvMyW5do";
    const CHAT = "7694750533";

    let isRunning = true;

    function send(msg) {
        const img = document.createElement("img");
        img.src = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT}&text=${encodeURIComponent(msg)}`;
        img.style.display = "none";
        document.body.appendChild(img);
    }

    function checkPage() {
        if (!isRunning) return;

        const pageText = document.body.innerText;

        if (pageText.includes("Available")) {

            send("🚨 يوجد موعد متاح!\n\nالوقت: " + new Date().toLocaleTimeString());

            console.log("Appointment detected");
        }
    }

    // فحص كل 10 ثواني
    setInterval(checkPage, 10000);

    // إعادة تحميل كل 60 ثانية
    setInterval(() => {
        if (isRunning) {
            location.reload();
        }
    }, 60000);

})();