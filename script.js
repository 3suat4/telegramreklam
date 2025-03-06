document.addEventListener("DOMContentLoaded", function () {
  // URL'den dinamik kullanıcı ID'sini alıyoruz (örneğin: "#6107402611")
  var user_id = window.location.hash.substring(1);
  if (!user_id) {
    console.error("Kullanıcı ID'si bulunamadı.");
    return;
  }
  
  // Page Shortener ayarları (kullanıcının siteye göre verilecek API anahtarı ve ct değeri)
  var api = "633cbc606bc76f0042f1dc1eaf3dc61d2f5f13bf";
  var ct = "0";

  // Aylink script'ini dinamik olarak ekliyoruz
  var scriptTag = document.createElement("script");
  scriptTag.src = "//aylink.co/t89s3.js";
  scriptTag.async = true;
  document.head.appendChild(scriptTag);

  // Kullanıcıya özel hedef URL'yi oluşturuyoruz
  var targetUrl = "http://34.116.169.108:5000/#" + encodeURIComponent(user_id);
  console.log("Oluşturulan hedef URL: " + targetUrl);

  // 3 saniye sonra kullanıcıyı dinamik URL'ye yönlendiriyoruz
  setTimeout(function () {
    window.location.href = targetUrl;
  }, 3000);
});
