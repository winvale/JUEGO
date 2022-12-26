const contenedor = document.querySelector(".contenedor");
//Definicion de medidas
const altoTablero = 300;
const anchoTablero = 570;
const altoBloque = 20;
const anchoBloque = 100;

//definir posicion usurio
const posicionInicialUsuario = [230, 10];
let posicionActualUsuario = posicionInicialUsuario;
//definir posicion ball
const posicionInicialBall = [270, 40];
let posicionActualBall = posicionInicialBall;
// definir mover ball
let xDireccionBall = 2;
let yDireccionBall = 2;
let diametro = 20;

const puntuacion = "";

//definir time
let timerID;
//Definicion de la clase bloque
class Bloque {
  constructor(ejeX, ejeY) {
    this.bottomLeft = [ejeX, ejeY];
    this.bottomRigth = [ejeX + anchoBloque, ejeY];
    this.topLeft = [ejeX, ejeY + altoBloque];
    this.topRigth = [ejeX + anchoBloque, ejeY + altoBloque];
  }
}

//Definir todos los bloques que
const bloques = [
  new Bloque(10, 250),
  new Bloque(120, 250),
  new Bloque(230, 250),
  new Bloque(340, 250),
  new Bloque(450, 250),
  new Bloque(10, 220),
  new Bloque(120, 220),
  new Bloque(230, 220),
  new Bloque(340, 220),
  new Bloque(450, 220),
  new Bloque(10, 190),
  new Bloque(120, 190),
  new Bloque(230, 190),
  new Bloque(340, 190),
  new Bloque(450, 190),
];
//funcion añadir bloques que
function addBloques() {
  for (let i = 0; i < bloques.length; i++) {
    const bloque = document.createElement("div");
    bloque.classList.add("bloque");
    bloque.style.left = bloques[i].bottomLeft[0] + "px";
    bloque.style.bottom = bloques[i].bottomLeft[1] + "px";
    contenedor.appendChild(bloque);
  }
}
addBloques();

function dibujarUsuario() {
  //definor usuario
  usuario.style.left = posicionActualUsuario[0] + "px";
  usuario.style.bottom = posicionActualUsuario[1] + "px";
}
//Añadir Usuario
const usuario = document.createElement("div");
usuario.classList.add("usuario");
contenedor.appendChild(usuario);
dibujarUsuario();
//mover al usuario
function moverUsuario(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (posicionActualUsuario[0] > 0) {
        posicionActualUsuario[0] -= 10;
        dibujarUsuario();
      }
      break;
    case "ArrowRight":
      if (posicionActualUsuario[0] < anchoTablero - anchoBloque) {
        posicionActualUsuario[0] += 10;
        dibujarUsuario();
      }
  }
}
// añadir evento escuhador para el documento
document.addEventListener("keydown", moverUsuario);

//Funcion dibujar ball

function dibujarBall() {
  ball.style.left = posicionActualBall[0] + "px";
  ball.style.bottom = posicionActualBall[1] + "px";
}
const ball = document.createElement("div");
ball.classList.add("ball");
contenedor.appendChild(ball);
dibujarBall();

//proyecccion ball
function moverBall() {
  posicionActualBall[0] += xDireccionBall;
  posicionActualBall[1] += yDireccionBall;
  dibujarBall();
  revisarColisiones();
  gameOver();
}

timerId = setInterval(moverBall, 20);

function revisarColisiones() {
  // colisiones con bloques
  for (let i = 0; i < bloques.length; i++) {
    if (
      posicionActualBall[0] > bloques[1].bottomLeft[0] &&
      posicionActualBall[0] < bloques[i].bottomRigth[0] &&
      posicionActualBall[1] + diametro > bloques[i].bottomLeft[1] &&
      posicionActualBall[1] < bloques[i].topLeft[1]
    ) {
      const allTheBloques = Array.from(document.querySelectorAll(".bloque"));
      allTheBloques[i].classList.remove("bloque");
      bloques.splice(i, 1);
      cambiarDireccion();
    }
  }

  //colisiones con paredes
  if (
    posicionActualBall[0] >= anchoTablero - diametro ||
    posicionActualBall[1] >= altoTablero - diametro ||
    posicionActualBall[0] <= 0 ||
    posicionActualBall[1] <= 0
  ) {
    cambiarDireccion();
  }
  //revision colision con usuario
  if (
    posicionActualBall[0] > posicionActualUsuario[0] &&
    posicionActualBall[0] < posicionActualUsuario[0] + anchoBloque &&
    posicionActualBall[1] > posicionActualUsuario[1] &&
    posicionActualBall[1] < posicionActualUsuario[1] + altoBloque
  ) {
    cambiarDireccion();
  }
}
//funcion game over
function gameOver() {
  if (posicionActualBall[1] <= 0) {
    clearInterval(timerId);
    puntuacion.innerHTML = "Perdiste Bestia... ";
    document.removeEventListener("keydown", moverUsuario);

    document.querySelector(".p").innerHTML = "¡Perdiste bestia!";
  }
}
//funcion de cambiar direccion
function cambiarDireccion() {
  if (xDireccionBall === 2 && yDireccionBall === 2) {
    yDireccionBall = -2;
    return;
  }
  if (xDireccionBall === 2 && yDireccionBall === -2) {
    xDireccionBall = -2;
    return;
  }
  if (xDireccionBall === -2 && yDireccionBall === -2) {
    yDireccionBall = 2;
    return;
  }
  if (xDireccionBall === -2 && yDireccionBall === 2) {
    xDireccionBall = 2;
    return;
  }
}
