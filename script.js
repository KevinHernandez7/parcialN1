var baraja;
var jugadores;
var vMenu;
var vJuego;

function construir() {
  construirVistas();
  baraja = llenarBaraja();
  mostrar(vMenu);
}

function llenarBaraja() {
  var aBaraja = new Array();
  aBaraja = llenarFamilia("diamantes");
  aBaraja = aBaraja.concat(llenarFamilia("corazones"));
  aBaraja = aBaraja.concat(llenarFamilia("treboles"));
  aBaraja = aBaraja.concat(llenarFamilia("espadas"));
  return aBaraja
}

function construirVistas() {
  vMenu = document.getElementById('vMenu');
  vJuego = document.getElementById('vJuego');
}

function Familia(sNombre) {
  this.familia = sNombre;
}

function Carta(sFamilia,sNombre,iValor){
  Familia.call(this,sFamilia);
  this.nombre = sNombre;
  this.valor = iValor;
}

Carta.prototype = new Familia();
Carta.prototype.obtenerDireccion = function() {
  var direccion = "images/"+this.familia+"/"+this.valor+".png";
  return direccion;
};

function llenarFamilia(sFam) {
  var a = new Array();
    for (var nombre = 2; nombre <= 10; nombre++) {
      var oCarta = new Carta(sFam,nombre,nombre);
      a.push(oCarta);
    }
    var oJ = new Carta(sFam,"J",11);
    a.push(oJ);
    var oQ = new Carta(sFam,"Q",12);
    a.push(oQ);
    var oK = new Carta(sFam,"K",13);
    a.push(oK);
    var oA = new Carta(sFam,"A",14);
    a.push(oA);
    return a;
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
  var indx = Math.floor(Math.random()*(n-1));
  //crea una copia del contenido de baraja en la posicion index
  var carta = baraja[indx].obtenerDireccion();
  //elimina el elemento de la baraja, para que no se vuelva a asignar
  baraja.splice(indx,1);
  return carta;
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
        img1.setAttribute("src",jugadores[i].carta1);
    var img2 = document.createElement("img");
        img2.setAttribute("src",jugadores[i].carta2);

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

//funcion para validar solo numeros enteros
function soloNumeros( evt ){
  if ( window.event ) {
    keyNum = evt.keyCode;
  } else {
    keyNum = evt.which;
  }
  if ( keyNum >= 48 && keyNum <= 57 ) {
    return true;
  } else {
    return false;
  }
}

function validarInput() {
  var numero=document.getElementById('inpJ').value;
  if (numero<=10&&numero>=2) {
    iniciar();
  }else {
    alert("Debe introcucir numeros del 2 al 10");
    window.location.reload();
    return document.getElementById('inpJ').value=2;
  };
}
