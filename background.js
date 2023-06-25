// background.js
// Este archivo es necesario para el funcionamiento de la versión 3 del manifiesto

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "cambiarColorBoton") {
      console.log("Mensaje recibido en el fondo de la extensión: Cambiar color del botón.");
      sendResponse({ message: "Color del botón cambiado." });
    }
  });
  