document.addEventListener("DOMContentLoaded", function () {
    console.log("Script çalıştı");

    var user_id = window.location.hash.substring(1);

    // Eğer hash mevcutsa ve yönlendirilmemişsek geri sayımı başlat
    if (user_id && !sessionStorage.getItem("redirected")) {
        var seconds = 20;
        var timerElement = document.getElementById("timer");

        if (!timerElement) {
            timerElement = document.createElement("div");
            timerElement.id = "timer";
            timerElement.style.fontSize = "24px";
            timerElement.style.marginTop = "20px";
            document.body.appendChild(timerElement);
        }

        timerElement.innerText = "Geri Sayım: " + seconds + " saniye";

        var interval = setInterval(function () {
            seconds--;
            timerElement.innerText = "Geri Sayım: " + seconds + " saniye";

            if (seconds <= 0) {
                clearInterval(interval);

                // Kullanıcıyı yönlendir
                var redirectUrl = "http://34.116.169.108:5000/#" + encodeURIComponent(user_id);
                console.log("Yönlendirme yapılıyor: " + redirectUrl);
                sessionStorage.setItem("redirected", "true"); // Yönlendirildiği bilgisini sakla
                window.location.href = redirectUrl;
            }
        }, 1000);
    } else if (sessionStorage.getItem("redirected")) {
        // Yönlendirildiyse geri sayımı durdur
        document.body.innerHTML = "<h2>Yönlendirildiniz.</h2>";
    } else {
        document.body.innerHTML = "<h2>Kullanıcı ID'si eksik.</h2>";
    }
});

// Eğer yönlendirildiğiniz sayfada tekrar kontrol etmek isterseniz:
if (window.location.href.startsWith("http://34.116.169.108:5000/#")) {
    sessionStorage.setItem("redirected", "true");
}
