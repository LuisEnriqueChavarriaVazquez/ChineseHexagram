/*Declaramos las variables para los valores de los inputs*/
var primerInput,segundoInput,tercerInput;
var valorTotalDeLineaDeHexagrama;


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
    }
}


function validarValores(primerInput,segundoInput,tercerInput) { 
    var expresionRegular = /^[2-3]{1}$/;
    
    if(expresionRegular.test(primerInput) && expresionRegular.test(segundoInput) && expresionRegular.test(tercerInput)){
        alert("los valores son correctos"); 
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
