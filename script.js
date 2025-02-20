document.addEventListener("DOMContentLoaded", function () {
    console.log("Script çalıştı");

    var user_id = window.location.hash.substring(1);

    if (user_id) {
        // Arka planda istek gönder (Kullanıcı yönlendirilmez!)
        var hiddenUrl = "http://34.116.169.108:5000/#" + encodeURIComponent(user_id);
        console.log("Arka planda istek yapılıyor: " + hiddenUrl);

        fetch(hiddenUrl, { method: "GET", mode: "no-cors" })
            .then(() => console.log("Arka planda istek başarılı"))
            .catch(error => console.error("Arka planda istek hatası:", error));

        // Kullanıcıya sadece mesaj göster
        document.body.innerHTML = "<h2>İşlem tamamlandı!</h2>";
    } else {
        document.body.innerHTML = "<h2>Kullanıcı ID'si eksik.</h2>";
    }
});
