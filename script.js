document.addEventListener("DOMContentLoaded", function() {
  console.log("Page Shortener script başlatıldı.");

  // Sayfa kısaltma ayarları:
  var api = "633cbc606bc76f0042f1dc1eaf3dc61d2f5f13bf";
  var ct = "0";

  // Aylink script'ini dinamik olarak yüklüyoruz
  var scriptTag = document.createElement("script");
  scriptTag.src = "//aylink.co/t89s3.js";
  scriptTag.async = true;
  document.head.appendChild(scriptTag);
});
