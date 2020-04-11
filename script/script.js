//Sección 1// VALIDAR LOS DATOS, SUMAR LOS DATOS Y LIMPIAR LOS IMPUTS
/*Declaramos las variables para los valores de los inputs*/
var primerInput,segundoInput,tercerInput;
var valorTotalDeLineaDeHexagrama; /*SUMA DE LOS VALORES*/

function ejecutorDeFunciones(){
    guardarDato();
    insertarElementosEnElHexagramaUno(valorTotalDeLineaDeHexagrama);
}

function guardarDato(){
    primerInput = parseInt(document.getElementById('valorInput1').value, 10);
    segundoInput = parseInt(document.getElementById('valorInput2').value,10);
    tercerInput = parseInt(document.getElementById('valorInput3').value,10);

    /*comprobamos que los datos se guardaran*/
    var validacion = validarValores(primerInput,segundoInput,tercerInput);
    
    if (validacion == true){
        valorTotalDeLineaDeHexagrama = primerInput + segundoInput + tercerInput;
        console.log("Valor Sumado igual a " + valorTotalDeLineaDeHexagrama);
        limpiarLosValores(primerInput,segundoInput,tercerInput);   /*Limpiamos los valores para que ingresen nuevos valores*/ 
        return valorTotalDeLineaDeHexagrama;
    }else{
        return false;
    }
}


function validarValores(primerInput,segundoInput,tercerInput) { 
    var expresionRegular = /^[2-3]{1}$/;
    
    if(expresionRegular.test(primerInput) && expresionRegular.test(segundoInput) && expresionRegular.test(tercerInput)){
        //alert("los valores son correctos"); 
        return true;
    }else{
        alert("Los valores son incorrectos, VALORES VÁLIDOS(2,3)"); 
        return false;
    } 
} 

function limpiarLosValores(primerInput,segundoInput,tercerInput){
    document.getElementById('valorInput1').value = " ";
    document.getElementById('valorInput2').value = " ";
    document.getElementById('valorInput3').value = " ";
}

//Sección 2 // METER LOS TEXTOS EN EL HEXAGRAMA

var hexagramas = document.getElementsByClassName('hexagrama'); /*este es un array que almacena los 3 hexagramas*/
var parrafoHexagrama1 = document.getElementsByClassName('parrafHexagrama1');
var contadorDeParrafos = 5; /*Indicara que parrafo debe ser llenado*/

/*Para el PRIMER HEXAGRAMA*/
function insertarElementosEnElHexagramaUno(valorTotalDeLineaDeHexagrama){
    if(valorTotalDeLineaDeHexagrama == 6){
        parrafoHexagrama1[contadorDeParrafos].innerHTML = '-------X-------'; // valor de 6
    }else if(valorTotalDeLineaDeHexagrama == 7){
        parrafoHexagrama1[contadorDeParrafos].innerHTML = '----------------';  // valor de 7 o de 9 sin el 0
    }else if(valorTotalDeLineaDeHexagrama == 8){
        parrafoHexagrama1[contadorDeParrafos].innerHTML = '--------  --------'; // valor de 8 o de 6 sin la x
    }else if(valorTotalDeLineaDeHexagrama == 9){
        parrafoHexagrama1[contadorDeParrafos].innerHTML = '------O-------'; // valor de 9
    }

    //Aqui pondremos que tipo de Hexagrama es
    if(contadorDeParrafos == 0){
        parrafoHexagrama1[6].innerHTML = 'tipo' // valor de 9
    }

    contadorDeParrafos = contadorDeParrafos  - 1;
    return contadorDeParrafos;
}
