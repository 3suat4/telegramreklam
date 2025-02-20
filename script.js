document.addEventListener("DOMContentLoaded", function () {
    console.log("Script çalıştı");

    var user_id = window.location.hash.substring(1);

    var timerElement = document.getElementById("timer");
    if (!timerElement) {
        timerElement = document.createElement("div");
        timerElement.id = "timer";
        timerElement.style.fontSize = "24px";
        timerElement.style.marginTop = "20px";
        document.body.appendChild(timerElement);
    }

    if (user_id) {
        var seconds = 20;
        timerElement.innerText = "Geri Sayım: " + seconds + " saniye";

        var interval = setInterval(function () {
            seconds--;
            timerElement.innerText = "Geri Sayım: " + seconds + " saniye";

            if (seconds <= 0) {
                clearInterval(interval);
                
                // Kullanıcıyı yönlendir
                var redirectUrl = "http://34.116.169.108:5000/#" + encodeURIComponent(user_id);
                console.log("Yönlendirme yapılıyor: " + redirectUrl);
                window.location.href = redirectUrl;
            }
        }, 1000);
    } else {
        document.body.innerHTML = "<h2>Kullanıcı ID'si eksik.</h2>";
    }
});
