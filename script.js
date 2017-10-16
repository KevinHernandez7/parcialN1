var baraja;
var jugadores;
var vMenu;
var vJuego;

function llenarBaraja() {
//este arreglo representa la disponibilidad de cartas para repartir
  var aBaraja = new Array(); 
//se llena con los nombres de las imagenes  
  for (var i = 1; i <= 52; i++) {
    aBaraja.push(i+".png");     
  }
  return aBaraja;
}


function llenarJugadores(n) {
  var aJugadores = new Array();
  for (var i = 0; i < n; i++) {
    var oJugador = new Jugador();
    aJugadores.push(oJugador);
  }
  return aJugadores;        //devuelve un arreglo con los jugadores
}

function Jugador() {
  this.dinero=100;                  //dinero inicial
  this.carta1 = sacarCarta();
  this.carta2 = sacarCarta();
}

function sacarCarta() {
  //asigna la cantidad actual de cartas disponibles
  var n = baraja.length;
  //genera un numero aleatorio de entre(n-1)opciones 
  var index = Math.floor(Math.random()*(n-1));
  //crea una copia del contenido de baraja en la posicion index
  var carta = baraja[index];
  //elimina el elemento de la baraja, para que no se vuelva a asignar
  baraja.splice(index,1);
  
  return carta;
}
 
//funcion para comprobar el funcionamiento de los metodos
function probar(){
    baraja = llenarBaraja();
    jugadores = llenarJugadores(3); //prueba para tres jugadores
    
    for(var i = 0 ; i < jugadores.length; i++){
        document.body.innerHTML += jugadores[i].carta1 + "," + jugadores[i].carta2+"</BR>"
    }
    
}
// Esta función recibe un elemento y lo oculta.
function ocultar(elemento) {
  elemento.style.display = "none";
  /* style.display:establece la propiedad de visualización del elemento al valor predeterminado, 
  es decir que elimina la visualización y luego la reestablece en linea tomando en cuenta 
  que esto es establecido en el CSS*/
} 
// Está función recibe el elemento y lo oculta
function mostrar(elemento) {
  elemento.style.display = "block";         
}
function construir() {
  vMenu = document.getElementById('vMenu');
  vJuego = document.getElementById('vJuego');
 /* document.getElementById: lo utlilizamos para obtener información de la vista del menú y del juego
 y poder mostrarlo.*/
  mostrar(vMenu);
}

