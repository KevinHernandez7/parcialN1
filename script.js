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
 

function construir() {
  vMenu = document.getElementById('vMenu');
  vJuego = document.getElementById('vJuego');
  baraja = llenarBaraja();
 /* document.getElementById: lo utlilizamos para obtener información de la vista del menú y del juego
 y poder mostrarlo.*/
  mostrar(vMenu);
}

function iniciar() {
  ocultar(vMenu);
  var n = parseInt(document.getElementById('inpJ').value);
  jugadores = llenarJugadores(n);
  repartir(n);
  mostrar(vJuego);
}

function repartir(n) {
  var radianes = Math.PI;     //valor inicial
  var h = 2*Math.PI/n;    //distancia angular entre elemntos;
  var ls = document.getElementById('ls');

  for (var i = 0; i < n; i++) {
        //asigna las imagenes de las cartas
    var img1 = document.createElement("img");
        img1.setAttribute("src","images/"+jugadores[i].carta1);
    var img2 = document.createElement("img");
        img2.setAttribute("src","images/"+jugadores[i].carta2);

    var e = document.createElement('li');

    rotar(e,radianes);
    posicionarEnCirculo(e,radianes,200,200,0);
    radianes += h;
    e.appendChild(img1);
    e.appendChild(img2);
    ls.appendChild(e);
  }
}

function rotar(o,fRadianes) {
    o.style.transform = "rotate("+fRadianes+"rad)";   //recibe el objeto a rotar y los grados que se le van a aplicar
}

function posicionarEnCirculo(o,fRadianes,r,b,a) {
    var x = Math.ceil(r+r*Math.sin(fRadianes));        //equacion para el atributo top
    var y = Math.ceil(r-r*Math.cos(fRadianes));        //equacion para el atributo left
    x += 195*Math.sin(fRadianes);                    //estira en x
    x+=b;                                       //b desplazamiento en x
    y+=a;                                       //a desplazamiento en y
    o.style.left = x+"px";
    o.style.top = y+"px";
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
