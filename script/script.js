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

/*Ingresar lo botones con sus ID'S*/
var botonInserLinea = document.getElementById('button1');//Boton para insertar lineas
var botonEliLinea = document.getElementById('button2');//Boton para elminiar lineas
var botonParaBorrarHexagrama = document.getElementById('button3'); //Boton para eliminar los hexagramas

botonEliLinea.disabled = true;
botonEliLinea.classList.add('inactiveButton');
botonParaBorrarHexagrama.disabled = true;
botonParaBorrarHexagrama.classList.add('inactiveButton');



/*Var para validar si es mutante o no*/
var noMutante = [];

/*Para el PRIMER HEXAGRAMA*/
function insertarElementosEnElHexagramaUno(valorTotalDeLineaDeHexagrama) {
    botonEliLinea.disabled = false;
    botonEliLinea.classList.remove('inactiveButton');
    botonParaBorrarHexagrama.disabled = false;
    botonParaBorrarHexagrama.classList.remove('inactiveButton');
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
        botonInserLinea.classList.add('inactiveButton');
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
        if (nuevoArrayNoMutanteInvertido[k] == 9 || nuevoArrayNoMutanteInvertido[k] == 8) {
            arrayCodigoRenovado.push("8");
        } else if (nuevoArrayNoMutanteInvertido[k] == 6 || nuevoArrayNoMutanteInvertido[k] == 7) {
            arrayCodigoRenovado.push("7");
        }
    }

    var revisionTipo = evaluarTipoHexagrama(arrayCodigoRenovado)
    parrafoHexagrama3[6].innerHTML = revisionTipo; // El tipo de HEXAGRAMA EN CASO DE SER NO MUTANTE
    console.log(nuevoArrayNoMutanteInvertido);

    var arrayInvertidoParaImpresion;
    arrayInvertidoParaImpresion = nuevoArrayNoMutanteInvertido.reverse();
    for (var i = 0; i <= 5; i++) {
        if (arrayInvertidoParaImpresion[i] == 6) {
            parrafoHexagrama3[i].innerHTML = '---------------';
        } else if (arrayInvertidoParaImpresion[i] == 9) {
            parrafoHexagrama3[i].innerHTML = '------- -------';
        } else if (arrayInvertidoParaImpresion[i] == 7) {
            parrafoHexagrama3[i].innerHTML = '---------------';
        } else if (arrayInvertidoParaImpresion[i] == 8) {
            parrafoHexagrama3[i].innerHTML = '------- -------';
        }
    }

}

//Sección 3 // Asignar un tipo de HEXAGRAMA

var tiposHexagramas = ["Ch'len <br> 乾為天", "K'un <br> 坤為地", "Chun <br> 水雷屯", "Meng <br> 山水蒙", "Hsü <br> 水天需", "Sung <br> 天水訟", "Shih <br> 地水師", 
"Pi <br> 水地比", "Hsiao Ch'u <br> 風天小畜", "Lü <br> 天泽履", "T'ai <br> 地天泰", "P'i <br> 天地否", "T'ung Jen <br> 天火同人", "Ta Yu <br> 火天大有", "Ch'ien <br> 地山謙",
"Yü <br> 雷地豫", "Sui <br> 泽雷随", "Ku <br> 山風蠱", "Lin <br> 地泽臨", "Kuan <br> 風地观", "Shin Ho <br> 火雷噬嗑", "Pi <br> 山火賁", "Po <br> 山地剥", "Fu <br> 地雷復", 
"Wu Wang <br> 天雷无妄", "Ta Ch'u <br> 山天大畜", "I <br> 山雷頤", "Ta Kuo <br> 泽風大過", "K'an <br> 坎為水", "Li <br> 離為火", "Hsien <br> 泽山咸", "Heng <br> 雷風恒", 
"Tun <br> 天山遯", "Ta Chuang <br> 雷天大壮", "Chin <br> 火地晋","Ming I <br> 地火明夷", "Chia Jen <br> 風火家人", "K'uei <br> 火泽睽", "Chien <br> 水山蹇", "Hsieh <br> 雷水解", 
"Sun <br> 山泽損", "I <br> 風雷益", "Kuai <br> 泽天夬", "Kou <br> 天風姤", "Ts'ui <br> 泽地萃", "Sheng <br> 地風升", "K'un <br> 泽水困", "Ching <br> 水風井", "Ko <br> 泽火革", 
"Ting <br> 火風鼎", "Chen <br> 震為雷", "Ken <br> 艮為山", "Chien <br> 風山漸", "Kuei Mei <br> 雷泽归妹","Feng <br> 雷火豊", "Lü <br> 火山旅", "Sun <br> 巽為風", "Tui <br> 兌為泽", 
"Huan <br> 風水渙", "Chieh <br> 水泽節", "Chung Fu <br> 風泽中孚", "Hsiao Kuo <br> 雷山小過", "Chi Chi <br> 水火既济", "Wei Chi <br> 火水未济"];

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
    botonInserLinea.classList.remove('inactiveButton');//Cambiar color boton de insertar linea
    parrafoHexagrama1[contadorDeParrafos + 1].innerHTML = '';
    noMutante.pop();
    contadorDeParrafos++;
    contadorNoMutante--;
    if (contadorDeParrafos == 5 && contadorNoMutante == 0) {
        botonEliLinea.disabled = true;//Deshabilitar boton de eliminar linea
        botonEliLinea.classList.add('inactiveButton');//Cambiar color boton de eliminar linea
        botonParaBorrarHexagrama.disabled = true;
        botonParaBorrarHexagrama.classList.add('inactiveButton');
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
    botonInserLinea.classList.remove('inactiveButton');//Cambiar color boton de insertar linea
    botonEliLinea.disabled = true;//Desahabilitar boton eliminar linea
    botonEliLinea.classList.add('inactiveButton');//Cambiar color boton  eliminar linea
    botonParaBorrarHexagrama.disabled = true;
    botonParaBorrarHexagrama.classList.add('inactiveButton');

    contadorDeParrafos = 5;
    contadorNoMutante = 0;
    noMutante = [];
    borrarHexagramaUno();
    borrarHexagramaDos();
    borrarHexagramaTres();
}