document.addEventListener("DOMContentLoaded", function () {
  console.log("Script çalıştı");

  // URL hash'inden kullanıcı ID'sini al
  var user_id = window.location.hash.substring(1);

  // HTML'deki ilgili öğeleri tanımla
  var rewardButton = document.getElementById("rewardButton");
  var timerElement = document.getElementById("timer");

  // Eğer timer elementi yoksa oluştur
  if (!timerElement) {
    timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.style.fontSize = "24px";
    timerElement.style.marginTop = "20px";
    document.body.appendChild(timerElement);
  }

  // Kullanıcı ID'si yoksa ödül butonunu ve geri sayımı gizle
  if (!user_id) {
    console.error("Kullanıcı ID'si eksik.");
    if (rewardButton) rewardButton.style.display = "none";
    timerElement.style.display = "none";
    return;
  }

  // Kullanıcı zaten yönlendirilmişse mesaj göster
  if (sessionStorage.getItem("redirected")) {
    var messageElement = document.getElementById("message");
    if (!messageElement) {
      messageElement = document.createElement("div");
      messageElement.id = "message";
      messageElement.style.fontSize = "24px";
      messageElement.style.marginTop = "20px";
      messageElement.style.textAlign = "center";
      messageElement.style.color = "red";
      document.body.appendChild(messageElement);
    }
    messageElement.innerText = "Zaten yönlendirildiniz.";
    
    // Timer ve butonu gizle
    timerElement.style.display = "none";
    if (rewardButton) rewardButton.style.display = "none";
    return;
  }

  // Ödül butonunu başlangıçta pasif hale getir
  if (rewardButton) {
    rewardButton.style.display = "none"; // Başlangıçta butonu gizle
    rewardButton.disabled = true;
  }

  // 20 saniyelik geri sayımı başlat
  var seconds = 20;
  timerElement.style.display = "block";
  timerElement.innerText = "Geri Sayım: " + seconds + " saniye";

  var interval = setInterval(function () {
    seconds--;
    timerElement.innerText = "Geri Sayım: " + seconds + " saniye";
    
    if (seconds <= 0) {
      clearInterval(interval);
      timerElement.style.display = "none"; // Timer'ı gizle

      // Ödül butonunu aktif hale getir
      if (rewardButton) {
        rewardButton.style.display = "inline-block";
        rewardButton.disabled = false;
        rewardButton.classList.remove("btn-secondary");
        rewardButton.classList.add("btn-success");
        rewardButton.textContent = "Ödül Al";
      }
    }
  }, 1000);

  // Ödül Al butonuna tıklama olayı
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
