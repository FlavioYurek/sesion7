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
  if (message.action === "capturarIdBtn") {
    console.log("Ejecutando acción capturar Id.");
    capturarId();
    var Id = capturarId ();
    sendResponse({ message: "El Id es: " + Id });

  }
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

function capturarId() {
  console.log("se ejecuto contentScript de función captureId");
  const botonesVariantInfo = document.querySelectorAll('.app-badge-button--variant-info');
  if (botonesVariantInfo.length >= 1) {
    console.log("botones encontrados: ", botonesVariantInfo);
    var btnPercent = botonesVariantInfo[1];
    btnPercent.click();
    // return Id;
  } else {
    console.log("No se encontraron suficientes botones.");
  }
}

// Escucha el mensaje enviado desde el background script o el popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "capturarIdBtn") {
    console.log("Ejecutando acción capturar Id.");
    capturarId(sendResponse);
  } else if (message.action === "capturarTextoResponse") {
    var textoCapturado = message.texto; // Obtener el texto de la respuesta
    console.log("Texto capturado:", textoCapturado);
    // Puedes hacer lo que necesites con el texto capturado aquí
  } else if (message.action === "cambiarColorBoton") {
    console.log("Ejecutando la acción para cambiar el color del botón.");
    cambiarColorBoton();
    sendResponse({ message: "Color del botón cambiado." });
  } else if (message.action === "waitForPopup") {
    waitForPopup();
  } else if (message.action === "fillForm") {
    fillForm();
  }
});

function capturarTexto(sendResponse) {
  console.log("Se ejecutó content script de la función capturarTexto");
  const spanElement = document.querySelector('.app-button__content');
  if (spanElement) {
    var textoCapturado = spanElement.textContent;
    console.log("Texto capturado:", textoCapturado);
    // Enviar el texto como respuesta al mensaje
    sendResponse({ action: "capturarTextoResponse", texto: textoCapturado });

    // Imprimir el valor capturado de texto en la consola
    console.log("Valor capturado de texto:", textoCapturado);
  } else {
    console.log("No se encontró el elemento span con la clase 'app-button__content'.");
  }
}


// Función para realizar una espera en milisegundos
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
