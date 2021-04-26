/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  let palo = ["♣", "♦", "♥", "♠"];
  let numero = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  function crearCarta(numero, palo, color, seccion) {
    switch (numero) {
      case "1":
        numero = "A";
        break;
      case "11":
        numero = "J";
        break;
      case "12":
        numero = "Q";
        break;
      case "13":
        numero = "K";
        break;
    }
    seccion.innerHTML += `<div class="col-sm-6 col-md-2">
              <div class="card shadow mt-3 text-center">
                <div class="col-4 d-flex">
                  <p class="palo${color}">${palo}</p>
                </div>
                <div
                  class="col-4 d-flex justify-content-center align-self-center"
                >
                  <p class="numero">${numero}</p>
                </div>
                <div class="col-4 d-flex justify-content-end align-self-end">
                  <p id="paloRotado" class="palo${color}">${palo}</p>
                </div>
              </div>
            </div>`;
  }

  //guardo los objetos donde van las cartas y el mensaje sort log
  let cartasArriba = document.querySelector("#cartasArriba");
  let cartasAbajo = document.querySelector("#cartasAbajo");
  let sortMessage = document.querySelector("#sortMessage");

  //evento pedir nuevas cartas (boton Draw)
  //cartasArribaGuardadas arreglo con dos arreglos, primer columna de numeros y segunda columna de Char
  var cartasArribaGuardadas = [];
  let btnDraw = document.querySelector("#btnDraw");
  btnDraw.addEventListener("click", () => {
    //vacio las cartas y el arreglo cartasArribaGuardadas
    cartasArriba.innerHTML = "";
    cartasArribaGuardadas = [];
    let numCards = document.querySelector("#numCards").value;
    if (numCards != 0 && numCards <= 12) {
      while (numCards > 0) {
        var color = "";
        var numeroCard = numero[Math.floor(Math.random() * 13)];
        var paloCard = palo[Math.floor(Math.random() * 4)];
        if (paloCard == "♥" || paloCard == "♦") {
          color = " rojo";
        }

        //si es un numero lo guardo en la primer posicion del arreglo cartasArribaGuardadas y si es una letra en la segunda posicion
        cartasArribaGuardadas.push([numeroCard, paloCard, color]);

        //creo la carta random y la agrego al div
        crearCarta(numeroCard.toString(), paloCard, color, cartasArriba);
        numCards--;
      }
    }
    console.log(cartasArribaGuardadas);
  });

  //bubble sort
  const bubbleSort = arr => {
    let wall = arr.length - 1; //we start the wall at the end of the array
    while (wall > 0) {
      let index = 0;
      while (index < wall) {
        //compare the adjacent positions, if the right one is bigger, we have to swap
        if (arr[index][0] > arr[index + 1][0]) {
          let aux = arr[index];
          arr[index] = arr[index + 1];
          arr[index + 1] = aux;
        }
        index++;
      }
      wall--; //decrease the wall for optimization
    }
    return arr;
  };

  //evento ordenar cartas (boton Bubble sort)
  let btnSort = document.querySelector("#btnSort");

  btnSort.addEventListener("click", () => {
    sortMessage.innerHTML = "Bubble sort log";
    sortMessage.style.display = "block";
    cartasAbajo.innerHTML = "";

    //ordenar numeros
    cartasArribaGuardadas = bubbleSort(cartasArribaGuardadas);

    //generar cartas
    cartasArribaGuardadas.forEach(elem => {
      crearCarta(elem[0].toString(), elem[1], elem[2], cartasAbajo);
    });
  });
};
