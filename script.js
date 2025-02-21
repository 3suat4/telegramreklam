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
                redirectToReward(user_id);
            }
        }, 1000);
    } else if (sessionStorage.getItem("redirected")) {
        document.body.innerHTML = "<h2>Yönlendirildiniz.</h2>";
    } else {
        document.body.innerHTML = "<h2>Kullanıcı ID'si eksik.</h2>";
    }

    // Ödül Al butonu için tıklama olayı
    var rewardButton = document.getElementById("rewardButton");
    if (rewardButton) {
        rewardButton.addEventListener("click", function () {
            if (user_id) {
                redirectToReward(user_id);
            } else {
                alert("Ödül almak için kullanıcı ID'si bulunamadı!");
            }
        });
    }
});

// Kullanıcıyı yönlendiren fonksiyon
function redirectToReward(user_id) {
    var redirectUrl = "http://34.116.169.108:5000/#" + encodeURIComponent(user_id);
    console.log("Yönlendirme yapılıyor: " + redirectUrl);
    sessionStorage.setItem("redirected", "true");
    window.location.href = redirectUrl;
}
