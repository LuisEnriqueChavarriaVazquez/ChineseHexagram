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
        parrafoHexagrama1[contadorDeParrafos].appendChild(document.createTextNode('-------X-------')); // valor de 6
        parrafoHexagrama1[contadorDeParrafos].classList.add('estirado');
    } else if (valorTotalDeLineaDeHexagrama == 7) {
        noMutante[contadorNoMutante] = 7;
        parrafoHexagrama1[contadorDeParrafos].appendChild(document.createTextNode('-----------------'));  // valor de 7 o de 9 sin el 0
        parrafoHexagrama1[contadorDeParrafos].classList.add('estirado');
    } else if (valorTotalDeLineaDeHexagrama == 8) {
        noMutante[contadorNoMutante] = 8;
        parrafoHexagrama1[contadorDeParrafos].appendChild(document.createTextNode('-------- --------')); // valor de 8 o de 6 sin la x
        parrafoHexagrama1[contadorDeParrafos].classList.add('estirado');
    } else if (valorTotalDeLineaDeHexagrama == 9) {
        noMutante[contadorNoMutante] = 9;
        parrafoHexagrama1[contadorDeParrafos].appendChild(document.createTextNode('-------O-------')); // valor de 9
        parrafoHexagrama1[contadorDeParrafos].classList.add('estirado');
    }

    //Aqui pondremos que tipo de Hexagrama es
    if (contadorDeParrafos == 0) {
        if (noMutante.includes(6) || noMutante.includes(9)) {
            parrafoHexagrama1[6].appendChild(document.createTextNode('')); // EN CASO DE SER MUTANTE
            insertarElementosEnElHexagramaDos(noMutante);

        } else {
            var revisionTipo = evaluarTipoHexagrama(noMutante)
            parrafoHexagrama1[6].appendChild(document.createTextNode(revisionTipo)); // El tipo de HEXAGRAMA EN CASO DE SER NO MUTANTE
            parrafoHexagrama1[6].classList.add('estirado');
            insertarTooltip(revisionTipo, 1) // Insercion del tooltip
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
            parrafoHexagrama2[i].appendChild(document.createTextNode('------- -------'));
            parrafoHexagrama2[i].classList.add('estirado');
        } else if (nuevoArrayNoMutanteInvertido[i] == 9) {
            parrafoHexagrama2[i].appendChild(document.createTextNode('---------------'));
            parrafoHexagrama2[i].classList.add('estirado');
        } else if (nuevoArrayNoMutanteInvertido[i] == 7) {
            parrafoHexagrama2[i].appendChild(document.createTextNode('---------------'));
            parrafoHexagrama2[i].classList.add('estirado');
        } else if (nuevoArrayNoMutanteInvertido[i] == 8) {
            parrafoHexagrama2[i].appendChild(document.createTextNode('------- -------'));
            parrafoHexagrama2[i].classList.add('estirado');
        }
    }


    var revisionTipo = evaluarTipoHexagrama(nuevoArrayNoMutanteInvertido.reverse())
    parrafoHexagrama2[6].appendChild(document.createTextNode(revisionTipo)); // El tipo de HEXAGRAMA EN CASO DE SER NO MUTANTE
    parrafoHexagrama2[6].classList.add('estirado');

    insertarElementosEnElHexagramaTres(nuevoArrayNoMutanteInvertido);
    insertarTooltip(revisionTipo, 2) // Insercion del tooltip
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
    parrafoHexagrama3[6].appendChild(document.createTextNode(revisionTipo)); // El tipo de HEXAGRAMA EN CASO DE SER NO MUTANTE
    parrafoHexagrama3[6].classList.add('estirado');
    console.log(nuevoArrayNoMutanteInvertido);

    var arrayInvertidoParaImpresion;
    arrayInvertidoParaImpresion = nuevoArrayNoMutanteInvertido.reverse();
    for (var i = 0; i <= 5; i++) {
        if (arrayInvertidoParaImpresion[i] == 6) {
            parrafoHexagrama3[i].appendChild(document.createTextNode('---------------'));
            parrafoHexagrama3[i].classList.add('estirado');
        } else if (arrayInvertidoParaImpresion[i] == 9) {
            parrafoHexagrama3[i].appendChild(document.createTextNode('------- -------'));
            parrafoHexagrama3[i].classList.add('estirado');
        } else if (arrayInvertidoParaImpresion[i] == 7) {
            parrafoHexagrama3[i].appendChild(document.createTextNode('---------------'));
            parrafoHexagrama3[i].classList.add('estirado');
        } else if (arrayInvertidoParaImpresion[i] == 8) {
            parrafoHexagrama3[i].appendChild(document.createTextNode('------- -------'));
            parrafoHexagrama3[i].classList.add('estirado');
        }
    }

    insertarTooltip(revisionTipo, 3) // Insercion del tooltip

}

//Sección 3 // Asignar un tipo de HEXAGRAMA

var tiposHexagramas = ["Ch'len乾為天", "K'un坤為地", "Chun水雷屯", "Meng山水蒙", "Hsü水天需", "Sung天水訟", "Shih地水師",
    "Pi水地比", "Hsiao Ch'u風天小畜", "Lü天泽履", "T'ai地天泰", "P'i天地否", "T'ung Jen天火同人", "Ta Yu火天大有", "Ch'ien地山謙",
    "Yü雷地豫", "Sui泽雷随", "Ku山風蠱", "Lin地泽臨", "Kuan風地观", "Shin Ho火雷噬嗑", "Pi山火賁", "Po山地剥", "Fu地雷復",
    "Wu Wang天雷无妄", "Ta Ch'u山天大畜", "I山雷頤", "Ta Kuo泽風大過", "K'an坎為水", "Li離為火", "Hsien泽山咸", "Heng雷風恒",
    "Tun天山遯", "Ta Chuang雷天大壮", "Chin火地晋", "Ming I地火明夷", "Chia Jen風火家人", "K'uei火泽睽", "Chien水山蹇", "Hsieh雷水解",
    "Sun山泽損", "I風雷益", "Kuai泽天夬", "Kou天風姤", "Ts'ui泽地萃", "Sheng地風升", "K'un泽水困", "Ching水風井", "Ko泽火革",
    "Ting火風鼎", "Chen震為雷", "Ken艮為山", "Chien風山漸", "Kuei Mei雷泽归妹", "Feng雷火豊", "Lü火山旅", "Sun巽為風", "Tui兌為泽",
    "Huan風水渙", "Chieh水泽節", "Chung Fu風泽中孚", "Hsiao Kuo雷山小過", "Chi Chi水火既济", "Wei Chi火水未济"];

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

//Seccion 4 // TOOLTIPS PARA LOS HEXAGRAMAS.

var arrayTooltips = ["1. Cielo. Lo creativo. El principio generador", "2. Tierra. Lo receptivo. El principio pasivo",
    "3. Acumular. El obstáculo inicial. La dificultad del comienzo", "4. Juventud. El joven necio. La inmadurez.",
    "5. Esperar. La espera. La maduración.", "6. Disputar. El conflicto. El pleito",
    "7. Ejército. La legión.", "8. Solidaridad. La unión", "9. Animalito doméstico. La pequeña fuerza",
    "10. Caminar. El porte. El paso cauteloso", "11. Prosperidad. La paz. La armonía.", "12. Cierre. El estancamiento. Lo inerte.",
    "13.Hombres Reunidos. La unión comunitaria", "14.Gran dominio. La gran posesión. Lo que se tiene de más.",
    "15.Condescendencia. La modestia. La humildad", "16.Ocuparse. El entusiasmo. La algarabía.", "17.Conformarse. La continuidad. El seguimiento.",
    "18.Destrucción. La reconstrucción. La labor en lo corrompido.", "19.Acercarse. Lo que va llegando.", "20.Observar. La contemplación.",
    "21.Quebrar mordiendo. La dentellada. La filosa mordedura", "22.Adornar. La elegancia. La gracia.", "23.Resquebrajar. La desintegración. El derrumbe",
    "24.Regresar. El retorno. Lo que vuelve.", "25.Sinceridad. La inocencia. La naturalidad.", "26.Fuerza educadora. El poder de lo fuerte. La gran acumulación",
    "27.Nutrirse. La alimentación. Las fauces.", "28.Excesos. La preponderancia de lo grande.", "29.Peligro. Lo abismal. La caida",
    "30.Distinguir. El resplandor. Lo adherente.", "31.Unir. La influencia.La atracción.", "32.Luna Creciente. La duración. La permanencia.",
    "33.Retirarse. EL repliegue.", "34.Gran fuerza. El gran vigor.", "35.Progresar. El avance.", "36.Luz que se apaga. El oscurecimiento", "37.Gente de familia. El clan.",
    "38.Contraste. La oposición. El antagonismo.", "39.Dificultad. El obstáculo. El impedimento.", "40.Explicar. La liberación. El alivio.",
    "41.Perder. La disminución.", "42.Evolución. El aumento. La ganancia.", "43.Decidir. El desbordamiento. La resolución",
    "44.Encontrarse. El acoplamiento.", "45.Cosechar. La reunión. La convergencia.", "46.Subir. El ascenso. La escalada.",
    "47.Angustia. La pesadumbre. El agotamiento", "48.El pozo de agua. La fuente.", "49.Renovar. La revolución. El cambio",
    "50.La caldera. Lo alquímico", "51.Trueno. La conmoción. Lo suscitativo.", "52.Cimientos. La quietud. La detención.",
    "53.Evolución. El progreso gradual.", "54.Desposar a la hija menor. La doncella.", "55.Abundancia. La plenitud.",
    "56.Viajero. El andariego", "57.Viento. Lo penetrante. Lo suave.", "58.Recogerse. La serenidad. La satisfacción.",
    "59.Confusión. La dispersión. La disolución ", "60.Moderación. La restricción. La limitación", "61.Fe Interior. La verdad interior. La sinceridad interna.",
    "62.Pequeñas cosas importantes. La pequeña preponderancia.", "63.Conclusiones. Después de la realización.", "64.Inconcluso. Antes de la realización."];

/*DECLARAMOS ELEMENTOS PARA LA PARTE DE LOS TOOLTIPS*/
var tooltip1 = document.getElementById('tooltip1');
var tooltip2 = document.getElementById('tooltip2');
var tooltip3 = document.getElementById('tooltip3');
var celdasNumeros = document.getElementsByClassName('colorOn');
var valorCeldaNumero = [];
var cadenaPrimerosDosCaracteresNumero;
var selectedCelda = [];
var contador = -1;

function insertarTooltip(cadenaTipo, numero) {
    var cadenaPrimerosDosCaracteres;
    cadenaPrimerosDosCaracteres = cadenaTipo.substr(0, 2);
    cadenaPrimerosDosCaracteresNumero = parseInt(cadenaPrimerosDosCaracteres, 10);
    if (numero === 1) {
        tooltip1.innerHTML = arrayTooltips[cadenaPrimerosDosCaracteresNumero - 1];
        tooltip1.classList.remove('tooltiptextHide');
        tooltip1.classList.add('estirado');
    } else if (numero === 2) {
        tooltip2.innerHTML = arrayTooltips[cadenaPrimerosDosCaracteresNumero - 1];
        tooltip2.classList.remove('tooltiptextHide');
        tooltip2.classList.add('estirado');
    } else if (numero === 3) {
        tooltip3.innerHTML = arrayTooltips[cadenaPrimerosDosCaracteresNumero - 1]; //Para el tooltip 3
        tooltip3.classList.remove('tooltiptextHide');
        tooltip3.classList.add('estirado');
    }

    //////////////////////////////////////////////////////////
    /*INGRESO DE LOS VALORES DE LA CELDA QUE ES SELECCIONADA*/
    /////////////////////////////////////////////////////////
    for (var i = 0; i < 64; i++) {
        valorCeldaNumero[i] = celdasNumeros[i].innerHTML;
        if (valorCeldaNumero[i] == cadenaPrimerosDosCaracteresNumero) {
            celdasNumeros[i].classList.add('TablaNumerosSelected');

            //Validacion de las celdas.
            console.log("El valor de la celda es " + i);
            contador = contador + 1;
            selectedCelda[contador] = i;
        }
    }
    console.log(selectedCelda);
    return cadenaPrimerosDosCaracteresNumero, valorCeldaNumero, selectedCelda;
}


//Sección 5 // Eliminado de los componenetes

//Borrar linea de primer hexagrama
function borrarLinea() {
    botonInserLinea.disabled = false;//Habilitar boton de insertar linea
    botonInserLinea.classList.remove('inactiveButton');//Cambiar color boton de insertar linea
    parrafoHexagrama1[contadorDeParrafos + 1].innerHTML = '';
    noMutante.pop();
    contadorDeParrafos++;
    contadorNoMutante--;
    parrafoHexagrama1[6].innerHTML = '';
    if (contadorDeParrafos == 5 && contadorNoMutante == 0) {
        botonEliLinea.disabled = true;//Deshabilitar boton de eliminar linea
        botonEliLinea.classList.add('inactiveButton');//Cambiar color boton de eliminar linea
        botonParaBorrarHexagrama.disabled = true;
        botonParaBorrarHexagrama.classList.add('inactiveButton');
    } else if (contadorDeParrafos == 0 && contadorNoMutante == 5) {
        borrarHexagramaDos();
        borrarHexagramaTres();
    }

    for (k = 0; k <= 6; k++) {
        parrafoHexagrama1[k].classList.remove('estirado');
        parrafoHexagrama2[k].classList.remove('estirado');
        parrafoHexagrama3[k].classList.remove('estirado');
    }

    tooltip1.classList.add('tooltiptextHide');
    tooltip2.classList.add('tooltiptextHide');
    tooltip3.classList.add('tooltiptextHide');

    //Elimnar el estilo de las celdas seleccionadas.

    for (var i = 0; i < 64; i++) {
        valorCeldaNumero[i] = celdasNumeros[i].innerHTML;
        if (valorCeldaNumero[i] == cadenaPrimerosDosCaracteresNumero) {
            celdasNumeros[selectedCelda[selectedCelda.length - 1]].classList.remove('TablaNumerosSelected');
            celdasNumeros[selectedCelda[selectedCelda.length - 2]].classList.remove('TablaNumerosSelected');
        }
    }

}

function borrarHexagramaUno() {
    for (var i = 0; i <= 6; i++) {
        parrafoHexagrama1[i].innerHTML = '';
    }

    tooltip1.classList.add('tooltiptextHide');
    tooltip2.classList.add('tooltiptextHide');
    tooltip3.classList.add('tooltiptextHide');
}

function borrarHexagramaDos() {
    for (var i = 0; i <= 6; i++) {
        parrafoHexagrama2[i].innerHTML = '';
    }

    tooltip1.classList.add('tooltiptextHide');
    tooltip2.classList.add('tooltiptextHide');
    tooltip3.classList.add('tooltiptextHide');
}

function borrarHexagramaTres() {
    for (var i = 0; i <= 6; i++) {
        parrafoHexagrama3[i].innerHTML = '';
    }

    tooltip1.classList.add('tooltiptextHide');
    tooltip2.classList.add('tooltiptextHide');
    tooltip3.classList.add('tooltiptextHide');
}

function borrarHexagrama() {
    botonInserLinea.disabled = false;//Habilitar boton de insertar linea
    botonInserLinea.classList.remove('inactiveButton');//Cambiar color boton de insertar linea
    botonEliLinea.disabled = true;//Desahabilitar boton eliminar linea
    botonEliLinea.classList.add('inactiveButton');//Cambiar color boton  eliminar linea
    botonParaBorrarHexagrama.disabled = true;
    botonParaBorrarHexagrama.classList.add('inactiveButton');

    //Elimnar el estilo de las celdas seleccionadas.

    for (var i = 0; i < 64; i++) {
        valorCeldaNumero[i] = celdasNumeros[i].innerHTML;
        if (valorCeldaNumero[i] == cadenaPrimerosDosCaracteresNumero) {
            celdasNumeros[selectedCelda[selectedCelda.length - 1]].classList.remove('TablaNumerosSelected');
            celdasNumeros[selectedCelda[selectedCelda.length - 2]].classList.remove('TablaNumerosSelected');
        }
    }


    contadorDeParrafos = 5;
    contadorNoMutante = 0;
    noMutante = [];
    borrarHexagramaUno();
    borrarHexagramaDos();
    borrarHexagramaTres();

    for (k = 0; k <= 6; k++) {
        parrafoHexagrama1[k].classList.remove('estirado');
        parrafoHexagrama2[k].classList.remove('estirado');
        parrafoHexagrama3[k].classList.remove('estirado');
    }
}