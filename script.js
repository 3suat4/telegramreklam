document.addEventListener("DOMContentLoaded", function() {
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

        var interval = setInterval(function() {
            seconds--;
            timerElement.innerText = "Geri Sayım: " + seconds + " saniye";

            if (seconds <= 0) {
                clearInterval(interval);
                var serverUrl = "http://34.116.169.108:5000/#"; 
                
                fetch(serverUrl + encodeURIComponent(user_id))
                    .then(response => response.text()) 
                    .then(data => {
                        console.log("Sunucudan gelen yanıt:", data);
                        try {
                            let jsonData = JSON.parse(data);
                            document.body.innerHTML = "<h2>" + jsonData.message + "</h2>";
                        } catch (e) {
                            document.body.innerHTML = "<h2>Geçersiz yanıt: " + data + "</h2>";
                        }
                    })
                    .catch(error => {
                        console.error("Ödül tetikleme hatası:", error);
                        document.body.innerHTML = "<h2>Sunucuya bağlanılamadı!</h2>";
                    });
            }
        }, 1000);
    } else {
        document.body.innerHTML = "<h2>Kullanıcı ID'si eksik.</h2>";
    }
});
