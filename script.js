document.addEventListener("DOMContentLoaded", function () {
    console.log("Script çalıştı");

    var user_id = window.location.hash.substring(1);
    var currentUrl = window.location.href;

    // Eğer https://reklamtelegram.netlify.app/# ile başlıyorsa geri sayımı başlat
    if (currentUrl.startsWith("https://reklamtelegram.netlify.app/#") && user_id) {
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
                // Yönlendirme
                var redirectUrl = currentUrl; // Mevcut URL'ye yönlendir
                console.log("Yönlendirme yapılıyor: " + redirectUrl);
                window.location.href = redirectUrl;
            }
        }, 1000);
    } else if (currentUrl.startsWith("http://34.116.169.108:5000/#")) {
        // http://34.116.169.108:5000/# adresindeyseniz geri sayım yapmayın
        document.body.innerHTML = "<h2>Geri sayım yok.</h2>";
    } else {
        document.body.innerHTML = "<h2>Kullanıcı ID'si eksik.</h2>";
    }
});
