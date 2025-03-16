document.addEventListener("DOMContentLoaded", function () {
  console.log("Script çalıştı");

  // URL hash'inden kullanıcı ID'sini alıyoruz
  var user_id = window.location.hash.substring(1);

  // İlgili öğeleri tanımla
  var rewardButton = document.getElementById("rewardButton");
  var timerElement = document.getElementById("timer");

  // Eğer timer elementi yoksa oluşturuyoruz
  if (!timerElement) {
    timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.style.fontSize = "24px";
    timerElement.style.marginTop = "20px";
    // Timer'ı uygun bir konteynıra ekleyin; burada body'e ekleniyor.
    document.body.appendChild(timerElement);
  }

  // Eğer kullanıcı ID'si yoksa, ödül butonunu ve timer'ı gizle
  if (!user_id) {
    console.error("Kullanıcı ID'si eksik.");
    if (rewardButton) rewardButton.style.display = "none";
    timerElement.style.display = "none";
    return;
  }

  // Eğer kullanıcı zaten yönlendirilmişse, mesajı gösterecek bir alan oluşturuyoruz
  if (sessionStorage.getItem("redirected")) {
    var messageElement = document.getElementById("message");
    if (!messageElement) {
      messageElement = document.createElement("div");
      messageElement.id = "message";
      messageElement.style.fontSize = "24px";
      messageElement.style.marginTop = "20px";
      document.body.appendChild(messageElement);
    }
    messageElement.innerText = "Yönlendirildiniz.";
    // Timer ve ödül butonunu gizle
    timerElement.style.display = "none";
    if (rewardButton) rewardButton.style.display = "none";
    return;
  }

  // Ödül butonunu başlangıçta gizli tutuyoruz
  if (rewardButton) {
    rewardButton.style.display = "none";
    rewardButton.disabled = true;
  }

  // 20 saniyelik geri sayımı başlatıyoruz
  var seconds = 20;
  timerElement.style.display = "block";
  timerElement.innerText = "Geri Sayım: " + seconds + " saniye";

  var interval = setInterval(function () {
    seconds--;
    timerElement.innerText = "Geri Sayım: " + seconds + " saniye";
    if (seconds <= 0) {
      clearInterval(interval);
      timerElement.style.display = "none";
      if (rewardButton) {
        rewardButton.style.display = "inline-block";
        rewardButton.disabled = false;
      }
    }
  }, 1000);

  // Ödül Al butonuna tıklama olayı ekle
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
