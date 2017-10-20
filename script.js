var vOpciones;
var vMenu;
var vJuego;
var inpDinero;
var centro;
var jugadores;
var baraja;
var dineroTotal = 0;
var k = 0;    //k identifica el turno del jugador
var ronda = 1;
var ciegaG = 10;


function construir() {
  construirVistas();
  baraja = llenarBaraja();
  mostrar(vMenu);
}

function iniciar() {
  ocultar(vMenu);
  var n = parseInt(document.getElementById('inpJ').value);
  jugadores = llenarJugadores(n);
  actualizarJugadores(n);
  mostrar(vJuego);
  mostrar(vOpciones);
  sombrear(k);
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
    oJugador.repartir();
    aJugadores.push(oJugador);
  }
  return aJugadores;        //devuelve un arreglo con los jugadores
}

function Jugador() {
  this.dinero = 2000;                  //dinero inicial
  this.mano;
}
Jugador.prototype.repartir = function(aComunes) {
  if (typeof this.mano == "undefined") {
    this.mano = new Mano();
    for (var i = 0; i < 2; i++) {
      this.mano.cartas.push(sacarCarta());
    }
  }else {
    this.mano.cartas = this.mano.cartas.concat(aComunes);
  }
};

function Mano() {
  this.nombre = "Carta Alta";
  this.valor = 1;
  this.cartas = new Array();
}
Mano.prototype.obtenerValores = function() {
  var n = new Array();
  for (var i = 0; i < this.cartas.length; i++) {
    n.push(+this.cartas[i].valor);
  }
  return n;
};
Mano.prototype.obtenerFamilias = function() {
  var n = new Array();
  for (var i = 0; i < this.cartas.length; i++) {
    n.push(this.cartas[i].familia);
  }
  return n;
}
Mano.prototype.establecerMano = function(sNombre,iValor) {
  if (typeof this.nombre == "undefined" || typeof this.valor == "undefined") {
    this.nombre = sNombre;
    this.valor = iValor;
  }else if(this.valor < iValor){
    this.nombre = sNombre;
    this.valor = iValor;
  }
};
Mano.prototype.obtenerCartaAlta = function() {
  var a = this.obtenerValores();
  a = a.sort(function(a, b){return b-a});
  return a[0];
}

function flop(){
  var a = new Array();
  for (var i = 0; i < 3; i++) {
    a.push(sacarCarta());
    var img = nuevaImagen(a[i].obtenerDireccion());
    centro.appendChild(img);
  }
  return a;
}

function nuevaCarta(){
  var a = new Array();
  a.push(sacarCarta());
  var img = nuevaImagen(a[0].obtenerDireccion());
  centro.appendChild(img);
  return a;
}

function pasar() {
  verificarRonda();
  actualizarJugadores();
}

function apostar() {
  var c = document.getElementById('dinero');
  dinero = parseInt(inpDinero.value);
  if (k==0) {
    ciegaG = 2*dinero;
  }
  if (k==1) {
    dinero = ciegaG;
  }
  jugadores[k].dinero -= dinero;
  dineroTotal += dinero;
  c.innerHTML = "Dinero: "+dineroTotal;
  inpDinero.min = ciegaG;
  verificarRonda();
  actualizarJugadores();
  if (k==1) {
    apostar();
  }
}

function retirarse() {
  try {
    jugadores.splice(k,1);
    var ul = document.getElementById('ls');
    ul.removeChild(ul.childNodes[k]);
    k--;
    verificarRonda();
    actualizarJugadores();
  } catch (e) {
    alert("Se acabo pues");
  }
}

function actualizarJugadores() {
  var n = jugadores.length;
  var l = document.getElementsByClassName('jugador').length;
  var ul = document.getElementById('ls');
  var radianes = Math.PI;
  var h = 2*Math.PI/n;    //distancia angular entre elemntos;

  for (var i = 0; i < n; i++) {
    var li = document.createElement('li');
    li.setAttribute("class","jugador");
    for (var j = 0; j <= 1;j++) {
      var img = nuevaImagen("images/back.png");
      li.appendChild(img);
    }
    rotar(li,radianes);
    posicionarEnCirculo(li,radianes,200,200,20);
    radianes += h;

    if (l == 0) {
      ul.appendChild(li);
    }else {
      ul.replaceChild(li , ul.childNodes[i]);
    }
    mostrarJugador();
  }

}

function mostrarJugador() {
  if (k!=0) {
    inpDinero.value = ciegaG;
    inpDinero.max = jugadores[k].dinero;
  }else {
    inpDinero.value = 10;
    inpDinero.max = 1000;
  }
  var ul = document.getElementById('ls');
  var radianes = posicionDeJugador();

  var li = document.createElement('li');
  li.setAttribute("class","jugador");

  for (var j = 0; j <= 1;j++) {
    var img = nuevaImagen(jugadores[k].mano.cartas[j].obtenerDireccion());
    li.appendChild(img);
  }
  rotar(li,radianes);
  posicionarEnCirculo(li,radianes,200,200,20);
  ul.replaceChild(li , ul.childNodes[k]);
  sombrear(k);
  return radianes;
}

function posicionDeJugador() {
  var n = jugadores.length;
  var radianes = Math.PI;     //valor inicial
  var h = 2*Math.PI/n;    //distancia angular entre elemntos;
  for (var i = 0; i < k; i++) {
    radianes += h;
  }
  return radianes;
}


function rotar(o,fRadianes) {
    o.style.transform = "rotate("+fRadianes+"rad)";   //recibe el objeto a rotar y los grados que se le van a aplicar
}
function posicionarEnCirculo(o,fRadianes,r,b,a) {
    //objeto,distancia angular,radio,desplazamiento en x,desplazamiento en y
    var x = Math.ceil(r+r*Math.sin(fRadianes));        //equacion para el atributo top
    var y = Math.ceil(r-r*Math.cos(fRadianes));        //equacion para el atributo left
    x += 195*Math.sin(fRadianes);                    //estira en x
    x+=b;                                       //b desplazamiento en x
    y+=a;                                       //a desplazamiento en y
    o.style.left = x+"px";
    o.style.top = y+"px";
}


function llenarBaraja() {
  var aBaraja = new Array();
  aBaraja = aBaraja.concat(llenarFamilia("diamantes")); //
  aBaraja = aBaraja.concat(llenarFamilia("corazones"));
  aBaraja = aBaraja.concat(llenarFamilia("treboles"));
  aBaraja = aBaraja.concat(llenarFamilia("espadas"));
  return aBaraja
}
function sacarCarta() {
  //asigna la cantidad actual de cartas disponibles
  var n = baraja.length;
  //genera un numero aleatorio de entre(n-1)opciones
  var indx = Math.floor(Math.random()*(n-1));
  //crea una copia del contenido de baraja en la posicion index
  var carta = baraja[indx];
  //elimina el elemento de la baraja, para que no se vuelva a asignar
  baraja.splice(indx,1);
  return carta;
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

function ocultar(elemento) {
  elemento.style.display = "none";
  /* style.display:establece la propiedad de visualización del elemento al valor predeterminado,
  es decir que elimina la visualización y luego la reestablece en linea tomando en cuenta
  que esto es establecido en el CSS*/
}
function mostrar(elemento) {
  elemento.style.display = "block";
}



function verificarRonda() {
  var n = (jugadores.length-1);
  if (k==n) {
    switch (ronda) {
      case 1:
          var cFlop = flop();
          for (var i = 0; i < jugadores.length; i++) {
            jugadores[i].repartir(cFlop);
            llenarMano(i);
          }
        break;
      case 2:
          var cTurn = nuevaCarta();
          for (var i = 0; i < jugadores.length; i++) {
            jugadores[i].repartir(cTurn);
            llenarMano(i);
          }
        break;
      case 3:
          var cRiver = nuevaCarta();
          for (var i = 0; i < jugadores.length; i++) {
            jugadores[i].repartir(cRiver);
            llenarMano(i);
          }
        break;
      case 4:
          var z = verificarGanador();
          var mano =jugadores[z].mano.nombre;
          var p = z+1;
          alert("Felicidades! Jugador "+(p)+ " tienes "+mano+" ganastes : $"+dineroTotal);
        break;
    }
    k=0;
    ciegaG = 10;
    inpDinero.min = ciegaG;
    ronda++;
  }else {
    k++;
  }
}

function verificarGanador() {
  var max = 0;
  var z;
  for (var i = 0; i < jugadores.length; i++) {
    var actual = jugadores[i].mano.valor;
    if (actual > max) {
      z = i;
      max = actual;
    }else if (actual == max) {
      var mActual = jugadores[i].mano;
      var mMax = jugadores[z].mano;;
      switch (mActual.valor) {
        case 1://caso para carta alta
          if (mActual.obtenerCartaAlta()>mMax.obtenerCartaAlta()) {
            z=i;
          }
          break;
        case 2://caso para pareja

          break;
        case 3://caso para pareja doble

          break;
        case 4://caso para trio

          break;
        case 5://caso para escalera

          break;
      }
    }
  }
  return z;

}

function construirVistas() {
  vMenu = document.getElementById('vMenu');
  vJuego = document.getElementById('vJuego');
  vOpciones = document.getElementById('vOpciones');
  centro = document.getElementById('centro');
  inpDinero = document.getElementById('inpDinero');
}
function sombrear(i) {
  var ul = document.getElementsByClassName('jugador'); //los divs que corresponden al jugador
  ul[i].style.boxShadow = "0px 0px 45px rgba(255, 1, 255, 0.8)";
}

function llenarMano(i) {

  var mano = jugadores[i].mano;
    if (esMismaFam(mano)) {
    mano.establecerMano("color",6);
    }
  cuantasIguales(mano);
  verificarEscalera(mano);
}

function verificarEscalera(mano) {
  var a = mano.obtenerValores();
  a = a.sort(function(a, b){return a-b});
  var c = 0;
  var i = 0;
  while ((i < a.length-1) && (c != 4)) {
    if (a[i]+1 == a[i+1]) {
      c++;
    }else if(a[i] != a[i+1]){
      c = 0;
    }
    i++;
  }

  if (c == 4 ) {
    if (a[c] == 14) {
      mano.establecerMano("Escalera Real",10);
    }else if (esMismaFam(mano)) {
      mano.establecerMano("Escalera de color",9);
    }else {
      mano.establecerMano("Escalera",5);
    }
  }
}

function esMismaFam(mano) {
  var a = mano.obtenerFamilias().sort();
  var iguales = 0;
  for (var i = 0; i <= 5; i++) {
    for (var j = (i+1); j < a.length; j++) {
      if (a[i] == a[j]) {
        iguales++;
      }
    }
    if (iguales >= 4) {
      return true;
    }else {
      iguales = 0;
    }
  }
  return false;
}

function cuantasIguales(mano) {
    var a = mano.obtenerValores().sort(function(a, b){return a-b});
    var pares = 0;
    var trio = false;
    var poker = false;
    var iguales;
    for (var i = 0; i <= 5; i++) {
      iguales = 0;
      for (var j = (i+1); j < a.length; j++) {
        if (a[i] == a[j]) {
          iguales++;
        }
      }
      switch (iguales) {
        case 1:
            pares++;
          break;
        case 2:
            pares--;
            trio = true;
          break;
        case 3:
            trio = false;
            poker = true;
          break;
      }
    }
    if (pares == 1) {
      mano.establecerMano("Par",2);
    }
    if (pares == 2) {
      mano.establecerMano("Doble Par",3);
    }else if (trio) {
      mano.establecerMano("Trio",4);
    }
    if (trio && (pares>0)) {
      mano.establecerMano("Full house",7);
    }else if (poker) {
      mano.establecerMano("Poker",8);
    }
}




function nuevaImagen(sAtributo) {
  var img = document.createElement("img");
  img.setAttribute("src",sAtributo);
  return img;
}
