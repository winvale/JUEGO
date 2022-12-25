const contenedor = document.querySelector(".contenedor");
//Definicion de medidas
const altoTablero = 300;
const anchoTable = 570;
const altoBloque = 20;
const anchoBloque = 100;

//definir posicion usurio
const posicionInicialUsuario = [230, 10];
let posicionActualUsuario = posicionInicialUsuario;
//Definicion de la clase bloque
class Bloque {
  constructor(ejeX, ejeY) {
    this.bottomLefft = [ejeX, ejeY];
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
    bloque.style.left = bloques[i].bottomLefft[0] + "px";
    bloque.style.bottom = bloques[i].bottomLefft[1] + "px";
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
