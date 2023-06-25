//poupup.js

document.addEventListener("DOMContentLoaded", function() {
  var cambiarColorBtn = document.getElementById("cambiarColorBtn");
  cambiarColorBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      setTimeout(function() {
        chrome.tabs.sendMessage(tabs[0].id, { action: "cambiarColorBoton" });
      }, 500); // Espera 500 milisegundos antes de enviar el mensaje
    });
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    setTimeout(function() {
      chrome.tabs.sendMessage(tabs[0].id, { action: "waitForPopup" });
    }, 2000); // Espera 500 milisegundos antes de enviar el mensaje
  });
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    setTimeout(function() {
      chrome.tabs.sendMessage(tabs[0].id, { action: "waitForUSDT" });
    }, 4000); // Espera 500 milisegundos antes de enviar el mensaje
  });

});

  