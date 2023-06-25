// contentScript.js

// Buscar el botón y cambiar su color
function cambiarColorBoton() {
  console.log("se ejecutó contentScript");
  var botones = document.getElementsByTagName("button");
  console.log("botones:", botones);
  var divs = document.getElementsByTagName("div");
  console.log("divs:", divs);

  if (botones.length >= 6) {
    var tercerBoton = botones[5];
    tercerBoton.style.backgroundColor = "red";
    tercerBoton.click();
    // waitForPopup()
  } else {
    console.log("No se encontraron suficientes botones.");
  }
}

// Función para esperar a que aparezca el popup
async function waitForPopup() {
  while (true) {
    var popupElement = document.querySelector('.app-modal-grid');
    if (popupElement) {
      fillForm();
      break;
    }
    await sleep(100); // Espera 100 milisegundos antes de volver a verificar
  }
}

async function waitForUSDT() {
  console.log("entro a waitForUSDT");
  while (true) {
    var selUSDT = document.querySelector('.app-select-option--gender-female:not(.app-select-option--selected)');
    console.log("entro a sel usdt");
    if (selUSDT) {
      selUSDT.click();
      break;
    }
    await sleep(100); // Espera 100 milisegundos antes de volver a verificar
  }
}

// // Función para esperar a que aparezca el popup
// function waitForPopup() {
//   var observer = new MutationObserver(function (mutationsList) {
//     mutationsList.forEach(function (mutation) {
//       if (mutation.addedNodes.length > 0) {
//         // Verifica si se ha agregado el elemento del popup
//         var popupElement = document.querySelector(".app-modal-grid");
//         if (popupElement) {
//           // Se encontró el popup, detén la observación y realiza las acciones necesarias
//           observer.disconnect();
//           fillForm();
//         }
//       }
//     });
//   });

//   // Observa los cambios en el documento
//   observer.observe(document.body, { childList: true, subtree: true });
// }

// Rellena el formulario dentro del popup
function fillForm() {
  console.log("se llamo el div");
  // var enviarDineroLabel = document.querySelector( '.app-select__label[role="button"]');
  var enviarDineroLabel = document.querySelector('.app-select__label');

  if (enviarDineroLabel) {
    console.log("se hizo el click()");
    enviarDineroLabel.click();

  } else {
    console.log('No se encontró el elemento "Enviar dinero a:" en el popup.');
  }
}

// Escucha el mensaje enviado desde el background script o el popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "cambiarColorBoton") {
    console.log("Ejecutando la acción para cambiar el color del botón.");
    cambiarColorBoton();
    sendResponse({ message: "Color del botón cambiado." });
  } else if (message.action === "waitForPopup") {
    waitForPopup();
  } else if (message.action === "fillForm") {
    fillForm();
  }
});



// Función para realizar una espera en milisegundos
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


