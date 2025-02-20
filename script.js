// Kullanıcı ID'sini hash'ten alın
var user_id = window.location.hash.substring(1);
if (user_id) {
    var seconds = 20;
    var timer = setInterval(function() {
        seconds--;
        if (seconds <= 0) {
            clearInterval(timer);
            // Ödül tetikleme isteği: serverUrl'yi sunucunuzun erişilebilir adresiyle değiştirin
            fetch("http://localhost:5000/ad_watched?user_id=" + encodeURIComponent(user_id))
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
