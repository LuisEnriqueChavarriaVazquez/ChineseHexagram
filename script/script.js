function obtenerSuma(){
   var primerValor=document.getElementById("PrimerParametroEntrada").value;
   var segundoValor=document.getElementById("SegundoParametroEntrada").value;
   var tercerValor=document.getElementById("TercerParametroEntrada").value;
   var suma;
   if(validarEntrada()==true){
    suma=parseInt(primerValor)+parseInt(segundoValor)+parseInt(tercerValor);
    return suma;
   }else{
    return -1;
   }
}

function validarEntrada(){
    var primerValor=document.getElementById("PrimerParametroEntrada").value;
    var segundoValor=document.getElementById("SegundoParametroEntrada").value;
    var tercerValor=document.getElementById("TercerParametroEntrada").value;
    var primerValorCorrecto=false;
    var segundoValorCorrecto=false;
    var TercerValorCorrecto=false;
    var valoresCorrectos=true;
    if(primerValor=='2' || primerValor=='3'){
       primerValorCorrecto=true;
    }
    if(segundoValor=='2' || segundoValor=='3'){
        segundoValorCorrecto=true;
    }
    if(tercerValor=='2' || tercerValor=='3'){
        TercerValorCorrecto=true;
    }
    if(primerValorCorrecto==false){
       valoresCorrectos=false;
    }else if(segundoValorCorrecto==false){
        valoresCorrectos=false;
    }else if(TercerValorCorrecto==false){
        valoresCorrectos=false;
    }
    return valoresCorrectos;
}