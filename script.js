document.addEventListener("DOMContentLoaded", function () {
  // URL hash'indeki kullanıcı ID'sini alıyoruz (örn: "#6107402611")
  var user_id = window.location.hash.substring(1);
  if (!user_id) {
    console.error("Kullanıcı ID'si bulunamadı.");
    return;
  }

  // Page Shortener ayarları
  var api = "633cbc606bc76f0042f1dc1eaf3dc61d2f5f13bf";
  var ct = "0";

  // Aylink.co Page Shortener script'ini dinamik olarak ekliyoruz
  var scriptTag = document.createElement("script");
  scriptTag.src = "//aylink.co/t89s3.js";
  scriptTag.async = true;
  document.head.appendChild(scriptTag);

  // Hedef URL: artık netlify adresine değil, http://34.116.169.108:5000/#[kullanıcıID]'ye yönlendiriyoruz
  var targetUrl = "http://34.116.169.108:5000/#" + encodeURIComponent(user_id);
  console.log("Oluşturulan hedef URL: " + targetUrl);

  // 3 saniye sonra otomatik olarak hedef URL'ye yönlendiriyoruz
  setTimeout(function () {
    window.location.href = targetUrl;
  }, 3000);
});
