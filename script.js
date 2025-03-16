document.addEventListener("DOMContentLoaded", function () {
  console.log("Script çalıştı");

  // URL hash'inden kullanıcı ID'sini alıyoruz
  var user_id = window.location.hash.substring(1);

  // HTML'deki ilgili öğeleri tanımla
  var rewardButton = document.getElementById("rewardButton");
  var timerElement = document.getElementById("timer");

  // Eğer timer elementi yoksa oluşturuyoruz
  if (!timerElement) {
    timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.style.fontSize = "24px";
    timerElement.style.marginTop = "20px";
    document.body.appendChild(timerElement);
  }

  // Eğer kullanıcı ID'si (hash) yoksa, yani üye değilse:
  if (!user_id) {
    console.log("Üye değilsiniz, ödül butonu gösterilmiyor.");
    if (rewardButton) rewardButton.style.display = "none";
    timerElement.style.display = "none";
    return;
  }

  // Üye ise: 20 saniyelik geri sayımı başlat
  var seconds = 20;
  timerElement.style.display = "block";
  timerElement.innerText = "Geri Sayım: " + seconds + " saniye";

  // Ödül butonunu başlangıçta gizle ve pasif yap
  if (rewardButton) {
    rewardButton.style.display = "none";
    rewardButton.disabled = true;
  }

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

  // Ödül butonuna tıklama olayı
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
  window.location.href = redirectUrl;
}
