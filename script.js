var baraja;
var jugadores;

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
