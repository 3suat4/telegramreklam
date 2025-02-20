document.addEventListener("DOMContentLoaded", function() {
    // URL hash'ten kullanıcı ID'sini alın
    var user_id = window.location.hash.substring(1);
    
    // Eğer 'timer' adlı bir element yoksa oluşturun
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
                // Sunucu URL'sini güncelleyin: Aşağıdaki URL, erişilebilir domaininize göre düzenlenmeli
                var serverUrl = "http://34.116.169.108:5000"; 
                fetch(serverUrl + "/ad_watched?user_id=" + encodeURIComponent(user_id))
                    .then(response => response.json())
                    .then(data => {
                        document.body.innerHTML = "<h2>" + data.message + "</h2>";
                    })
                    .catch(error => {
                        console.error("Ödül tetikleme hatası:", error);
                    });
            }
        }, 1000);
    } else {
        document.body.innerHTML = "<h2>Kullanıcı ID'si eksik.</h2>";
    }
});
