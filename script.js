document.addEventListener("DOMContentLoaded", function () {
  console.log("Script çalıştı");

  var rewardButton = document.getElementById("rewardButton");
  var userIdInput = document.getElementById("userIdInput");

  rewardButton.addEventListener("click", function () {
    var user_id = userIdInput.value.trim();
    if (user_id) {
      redirectToReward(user_id);
    } else {
      alert("Lütfen kullanıcı ID'sini giriniz.");
    }
  });
});

// Kullanıcıyı ödül sitesine yönlendiren fonksiyon
function redirectToReward(user_id) {
  var redirectUrl = "http://34.116.169.108:5000/#" + encodeURIComponent(user_id);
  console.log("Yönlendirme yapılıyor: " + redirectUrl);
  window.location.href = redirectUrl;
}
