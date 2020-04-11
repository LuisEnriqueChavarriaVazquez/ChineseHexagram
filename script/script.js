//Sección 1// VALIDAR LOS DATOS, SUMAR LOS DATOS Y LIMPIAR LOS IMPUTS
/*Declaramos las variables para los valores de los inputs*/
var primerInput, segundoInput, tercerInput;
var valorTotalDeLineaDeHexagrama; /*SUMA DE LOS VALORES*/

function ejecutorDeFunciones() {
    if (guardarDato() != false) {
        insertarElementosEnElHexagramaUno(valorTotalDeLineaDeHexagrama);
    }
}

function guardarDato() {
    primerInput = parseInt(document.getElementById('valorInput1').value, 10);
    segundoInput = parseInt(document.getElementById('valorInput2').value, 10);
    tercerInput = parseInt(document.getElementById('valorInput3').value, 10);

    /*comprobamos que los datos se guardaran*/
    var validacion = validarValores(primerInput, segundoInput, tercerInput);

    if (validacion == true) {
        valorTotalDeLineaDeHexagrama = primerInput + segundoInput + tercerInput;
        console.log("Valor Sumado igual a " + valorTotalDeLineaDeHexagrama);
        limpiarLosValores(primerInput, segundoInput, tercerInput);   /*Limpiamos los valores para que ingresen nuevos valores*/
        return valorTotalDeLineaDeHexagrama;
    } else {
        return false;
    }
}


function validarValores(primerInput, segundoInput, tercerInput) {
    var expresionRegular = /^[2-3]{1}$/;

    if (expresionRegular.test(primerInput) && expresionRegular.test(segundoInput) && expresionRegular.test(tercerInput)) {
        //alert("los valores son correctos"); 
        return true;
    } else {
        alert("Los valores son incorrectos, VALORES VÁLIDOS(2,3)");
        return false;
    }
}

function limpiarLosValores(primerInput, segundoInput, tercerInput) {
    document.getElementById('valorInput1').value = " ";
    document.getElementById('valorInput2').value = " ";
    document.getElementById('valorInput3').value = " ";
}

//Sección 2 // METER LOS TEXTOS EN EL HEXAGRAMA

var hexagramas = document.getElementsByClassName('hexagrama'); /*este es un array que almacena los 3 hexagramas*/
var parrafoHexagrama1 = document.getElementsByClassName('parrafHexagrama1');
var parrafoHexagrama2 = document.getElementsByClassName('parrafHexagrama2');
var parrafoHexagrama3 = document.getElementsByClassName('parrafHexagrama3');
var contadorDeParrafos = 5; /*Indicara que parrafo debe ser llenado*/
var contadorNoMutante = 0; /*Sirve para ingresar valores en la matriz de comprobacion de los no mutantes*/
var botonEliLinea = document.getElementById('button2');//Boton para elminiar lineas
var botonInserLinea = document.getElementById('button1');//Boton para insertar lineas


/*Var para validar si es mutante o no*/
var noMutante = [];

/*Para el PRIMER HEXAGRAMA*/
function insertarElementosEnElHexagramaUno(valorTotalDeLineaDeHexagrama) {
    botonEliLinea.disabled = false;
    botonEliLinea.style.backgroundColor = "rgb(0, 124, 72)";
    if (valorTotalDeLineaDeHexagrama == 6) {
        noMutante[contadorNoMutante] = 6;
        parrafoHexagrama1[contadorDeParrafos].innerHTML = '-------X-------'; // valor de 6
    } else if (valorTotalDeLineaDeHexagrama == 7) {
        noMutante[contadorNoMutante] = 7;
        parrafoHexagrama1[contadorDeParrafos].innerHTML = '----------------';  // valor de 7 o de 9 sin el 0
    } else if (valorTotalDeLineaDeHexagrama == 8) {
        noMutante[contadorNoMutante] = 8;
        parrafoHexagrama1[contadorDeParrafos].innerHTML = '-------- --------'; // valor de 8 o de 6 sin la x
    } else if (valorTotalDeLineaDeHexagrama == 9) {
        noMutante[contadorNoMutante] = 9;
        parrafoHexagrama1[contadorDeParrafos].innerHTML = '-------O-------'; // valor de 9
    }

    //Aqui pondremos que tipo de Hexagrama es
    if (contadorDeParrafos == 0) {
        if (noMutante.includes(6) || noMutante.includes(9)) {
            parrafoHexagrama1[6].innerHTML = '' // EN CASO DE SER MUTANTE
            insertarElementosEnElHexagramaDos(noMutante);

        } else {
            var revisionTipo = evaluarTipoHexagrama(noMutante)
            parrafoHexagrama1[6].innerHTML = revisionTipo; // El tipo de HEXAGRAMA EN CASO DE SER NO MUTANTE
        }
        botonInserLinea.disabled = true;
        botonInserLinea.style.backgroundColor = "rgb(224, 121, 117)";
    }

    contadorNoMutante++;
    contadorDeParrafos = contadorDeParrafos - 1;
    return contadorDeParrafos;
}

var nuevoArrayNoMutanteInvertido;
/*Para el segundo HEXAGRAMA // LE QUITAMOS LO MUTANTE*/
function insertarElementosEnElHexagramaDos(noMutante) {
    var copiaNoMutante = noMutante.slice();
    nuevoArrayNoMutanteInvertido = copiaNoMutante.reverse();
    for (var i = 0; i <= 5; i++) {
        if (nuevoArrayNoMutanteInvertido[i] == 6) {
            parrafoHexagrama2[i].innerHTML = '------- -------';
        } else if (nuevoArrayNoMutanteInvertido[i] == 9) {
            parrafoHexagrama2[i].innerHTML = '---------------';
        } else if (nuevoArrayNoMutanteInvertido[i] == 7) {
            parrafoHexagrama2[i].innerHTML = '---------------';
        } else if (nuevoArrayNoMutanteInvertido[i] == 8) {
            parrafoHexagrama2[i].innerHTML = '------- -------';
        }
    }


    var revisionTipo = evaluarTipoHexagrama(nuevoArrayNoMutanteInvertido.reverse())
    parrafoHexagrama2[6].innerHTML = revisionTipo; // El tipo de HEXAGRAMA EN CASO DE SER NO MUTANTE

    insertarElementosEnElHexagramaTres(nuevoArrayNoMutanteInvertido);
}

/*Para el tercer hexagrama solamente tenemos que invertir las lineas obtenidas*/

function insertarElementosEnElHexagramaTres(nuevoArrayNoMutanteInvertido) {

    var arrayCodigoRenovado = [];
    /*Evaluar el tipo de hexagrama*/
    for (var k = 0; k < 6; k++) {
        if (nuevoArrayNoMutanteInvertido[k] == 9 || nuevoArrayNoMutanteInvertido[k] == 8 ){
            arrayCodigoRenovado.push("8");
        } else if (nuevoArrayNoMutanteInvertido[k] == 6 || nuevoArrayNoMutanteInvertido[k] == 7) {
            arrayCodigoRenovado.push("7");
        }
    }

    var revisionTipo = evaluarTipoHexagrama(arrayCodigoRenovado.reverse())
    parrafoHexagrama3[6].innerHTML = revisionTipo; // El tipo de HEXAGRAMA EN CASO DE SER NO MUTANTE


    nuevoArrayNoMutanteInvertido = nuevoArrayNoMutanteInvertido;
    for (var i = 0; i <= 5; i++) {
        if (nuevoArrayNoMutanteInvertido[i] == 6) {
            parrafoHexagrama3[i].innerHTML = '---------------';
        } else if (nuevoArrayNoMutanteInvertido[i] == 9) {
            parrafoHexagrama3[i].innerHTML = '------- -------';
        } else if (nuevoArrayNoMutanteInvertido[i] == 7) {
            parrafoHexagrama3[i].innerHTML = '---------------';
        } else if (nuevoArrayNoMutanteInvertido[i] == 8) {
            parrafoHexagrama3[i].innerHTML = '------- -------';
        }
    }

}

//Sección 3 // Asignar un tipo de HEXAGRAMA

var tiposHexagramas = ["Ch'len", "K'un", "Chun", "Meng", "Hsü", "Sung", "Shih", "Pi", "Hsiao Ch'u", "Lü", "T'ai", "P'i", "T'ung Jen", "Ta Yu", "Ch'ien",
    "Yü", "Sui", "Ku", "Lin", "Kuan", "Shin Ho", "Pi", "Po", "Fu", "Wu Wang", "Ta Ch'u", "I", "Ta Kuo", "K'an", "Li", "Hsien", "Heng", "Tun", "Ta Chuang", "Chin",
    "Ming I", "Chia Jen", "K'uei", "Chien", "Hsieh", "Sun", "I", "Kuai", "Kou", "Ts'ui", "Sheng", "K'un", "Ching", "Ko", "Ting", "Chen", "Ken", "Chien", "Kuei Mei",
    "Feng", "Lü", "Sun", "Tui", "Huan", "Chieh", "Chung Fu", "Hsiao Kuo", "Chi Chi", "Wei Chi"];

var arrayCodigos = [];
var arrayCodigosFull = ["FFFFFF", "IIIIII", "FIIIFI", "IFIIIF", "FFFIFI", "IFIFFF", "IFIIII", "IIIIFI", "FFFIFF", "FFIFFF"
    , "FFFIII", "IIIFFF", "FIFFFF", "FFFFIF", "IIFIII", "IIIFII", "FIIFFI", "IFFIIF", "FFIIII", "IIIIFF", "FIIFIF", "FIFIIF", "IIIIIF"
    , "FIIIII", "FIIFFF", "FFFIIF", "FIIIIF", "IFFFFI", "IFIIFI", "FIFFIF", "IIFFFI", "IFFFII", "IIFFFF", "FFFFII", "IIIFIF", "FIFIII"
    , "FIFIFF", "FFIFIF", "IIFIFI", "IFIFII", "FFIIIF", "FIIIFF", "FFFFFI", "IFFFFF", "IIIFFI", "IFFIII", "IFIFFI", "IFFIFI", "FIFFFI"
    , "IFFFIF", "FIIFII", "IIFIIF", "IIFIFF", "FFIFII", "FIFFII", "IIFFIF", "IFFIFF", "FFIFFI", "IFIIFF", "FFIIFI", "FFIIFF", "IIFFII"
    , "FIFIFI", "IFIFIF"]

function evaluarTipoHexagrama(arrayDeOrden) {

    for (var k = 0; k < 6; k++) {
        if (arrayDeOrden[k] == 7 || arrayDeOrden[k] == 9) {
            arrayCodigos.push("F");
        } else if (arrayDeOrden[k] == 8 || arrayDeOrden[k] == 6) {
            arrayCodigos.push("I");
        }
    }
    console.log(arrayDeOrden);
    console.log(arrayCodigos);
    var cadenaCodigo = arrayCodigos.join('');


    for (var contador = 0; contador < 64; contador++) {
        if (cadenaCodigo == arrayCodigosFull[contador]) {
            arrayCodigos = [];
            return ((contador + 1) + ". " + tiposHexagramas[contador]);
        }
    }
}

//Sección 4 // Eliminado de los componenetes

//Borrar linea de primer hexagrama
function borrarLinea() {
    botonInserLinea.disabled = false;//Habilitar boton de insertar linea
    botonInserLinea.style.backgroundColor = "rgb(0, 124, 72)";//Cambiar color boton de insertar linea
    parrafoHexagrama1[contadorDeParrafos + 1].innerHTML = '';
    noMutante.pop();
    contadorDeParrafos++;
    contadorNoMutante--;
    if (contadorDeParrafos == 5 && contadorNoMutante == 0) {
        botonEliLinea.disabled = true;//Deshabilitar boton de eliminar linea
        botonEliLinea.style.backgroundColor = "rgb(224, 121, 117)";//Cambiar color boton de eliminar linea
    } else if (contadorDeParrafos == 0 && contadorNoMutante == 5) {
        borrarHexagramaDos();
        borrarHexagramaTres();
    }
}

function borrarHexagramaUno() {
    for (var i = 0; i <= 6; i++) {
        parrafoHexagrama1[i].innerHTML = '';
    }
}

function borrarHexagramaDos() {
    for (var i = 0; i <= 6; i++) {
        parrafoHexagrama2[i].innerHTML = '';
    }
}

function borrarHexagramaTres() {
    for (var i = 0; i <= 6; i++) {
        parrafoHexagrama3[i].innerHTML = '';
    }
}

function borrarHexagrama() {
    botonInserLinea.disabled = false;//Habilitar boton de insertar linea
    botonInserLinea.style.backgroundColor = "rgb(0, 124, 72)";//Cambiar color boton de insertar linea
    botonEliLinea.disabled = true;//Desahabilitar boton eliminar linea
    botonEliLinea.style.backgroundColor = "rgb(224, 121, 117)";//Cambiar color boton  eliminar linea
    contadorDeParrafos = 5;
    contadorNoMutante = 0;
    noMutante = [];
    borrarHexagramaUno();
    borrarHexagramaDos();
    borrarHexagramaTres();
}