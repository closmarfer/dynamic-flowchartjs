(function ( $ ) {

	 

$.fn.dinamicFlowchartJS = function(options) {

    
    /*
     * Los datos se cargan desde un archivo json en el que se encuentra la
     * variable datos con el array de los mismos
     */

    


/*######Script para las animaciones######*/
var settings = $.extend({
			// These are the defaults.
			volverAnterior: true,
            velocidadFondo: 200,
            tiempoFondo: 2000,
            tiempoAnimacion: 1000,
            easeElementos: "linear",
            easeFondo: "linear",
            inicio: "#inicio",
            animacionInicial:true,
            datos: {
                "#inicio": {
                    "pregunta": "Cómo empezar",
                    "tipo": "circulo",
                    "respuestas": {
                        //Añadir un nuevo item que consista en insertar una clase para el enlace.
                        //Asi los usuarios podrán indicar una clase distinta para, por ejemplo
                        //los enlaces que apunten a una página externa al diagrama
                        "toLeftTop": {
                            "texto": "",
                            "enlace": ""
                        },
                        "toTop": {
                            "texto": "",
                            "enlace": ""
                        },
                        "toRightTop": {
                            "texto": "",
                            "enlace": ""
                        },
                        "toLeft": {
                            "texto": "",
                            "enlace": ""
                        },
                        "toRight": {
                            "texto": "",
                            "enlace": ""
                        },
                        "toLeftBottom": {
                            "texto": "",
                            "enlace": ""
                        },
                        "toBottom": {
                            "texto": "Empezar",
                            "enlace": "#pregunta-inicio"
                        },
                        "toRightBottom": {
                            "texto": "",
                            "enlace": ""
                        }

                    }


                }
            }
		}, options );


    
/*######Creación de las cajas que contendrán los diferentes elementos######*/
    var content = '<div class="cuadro-unidad cuadro-vacio">\
                  <a href="" class="paso-anterior invisible">Paso anterior</a>\
            <div class="contenidoDiagrama">\
                <div>\
            </div>\
                <div class="row">\
                   <div class="toLeftTop invisible">\
                        <a href=""></a> \
                    </div>\
                    <div class="toTop invisible">\
                        <a href=""></a>\
                    </div>\
                    <div class="toRightTop invisible">\
                        <a href=""></a>\
                    </div>\
                </div>\
                <div class="row center-row">\
                    <div class="toLeft invisible">\
                        <a href=""></a>\
                    </div>\
                    <div class="center pregunta">\
                           <p class=""></p>\
                    </div>\
                    <div class="toRight invisible">\
                        <a href=""></a>\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="toLeftBottom invisible">\
                        <a href=""></a>\
                    </div>\
                    <div class="toBottom invisible">\
                        <a href=""></a>\
                    </div>\
                    <div class="toRightBottom invisible">\
                        <a href=""></a>\
                    </div>\
                </div>\
                <div>\
                    <a href="#inicio" class="volver-empezar">Volver a empezar</a>\
                </div>\
            </div>\
        </div>';
    
    this.html(content);
    
    var backStory = Array();
    var backMove = Array();
    function saveStory($paso){
        //Esta funcion guarda en la variable backStory los pasos que va visitando el usuario
        //Para poder darle al boton atras
        backStory.push($paso);
        //Para generar el enlace del paso anterior
        $pasoAnt = $(".paso-anterior");
        $pasoAnt.attr("href", $paso);
        $pasoAnt.removeClass("invisible"); 
    }

    function saveStoryMove($move){
        //Esta función guarda el movimiento que debe hacer la cámara
        //al pulsar el botón atrás
        backMove.push($move);
        console.log(backMove);
    }
    
    /*Ancho y alto de los diferentes divs */
    var $documentW = $(window).width() * 0.95;
    var $documentH = $(window).height() * 0.95;

    $(".cuadro-unidad").css("width", $documentW);//anchura
    $(".cuadro-unidad").css("height", $documentH);//altura
    
    //cambia los parámetros al cambiar tamaño de la ventana
    $(window).resize(function() {

        var $documentW = $(window).width() * 0.95;
        var $documentH = $(window).height() * 0.95;

        $(".cuadro-unidad").css("width", $documentW);//anchura
        $(".cuadro-unidad").css("height", $documentH);//altura

    });
    
    /*Animación inicial*/
    if(settings.animacionInicial === true){
        
        rellenaDatos(settings.inicio);
        valorTop = parseInt($("#fondo").css("top")) + settings.velocidadFondo;
        $("#fondo").animate({
            'top': valorTop
        }, settings.tiempoAnimacion, settings.easeFondo);
        $(".cuadro-vacio").animate({
            'top': 0,
            'left': 0
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(".cuadro-vacio").addClass("enMedio");
        });
                $(".paso-anterior").addClass("invisible");
    }else{
        $(".paso-anterior").addClass("invisible");
        $(".cuadro-vacio").addClass("enMedio");
        rellenaDatos(settings.inicio);
    }
       

    var $caja = settings.inicio;
    /*###Función genérica para el enlace###*/
    $(".contenidoDiagrama").on("click", "a", function() {
        //Guarda el paso anterior
        saveStory($caja);
        $caja = this.hash;
        $direccionMovimiento = $(this).parent().attr("class");

        switch ($direccionMovimiento)
        {
            case 'toLeftTop':
                toLeftTop($(".cuadro-vacio"), $caja);
                saveStoryMove("toRightBottom");
                break;
            case 'toTop':
                toTop($(".cuadro-vacio"), $caja);
                saveStoryMove("toBottom");
                break;
            case 'toRightTop':
                toRightTop($(".cuadro-vacio"), $caja);
                saveStoryMove("toLeftBottom");
                break;
            case 'toLeft':
                toLeft($(".cuadro-vacio"), $caja);
                saveStoryMove("toRight");
                break;
            case 'toRight':
                toRight($(".cuadro-vacio"), $caja);
                saveStoryMove("toLeft");
                break;
            case 'toLeftBottom':
                toLeftBottom($(".cuadro-vacio"), $caja);
                saveStoryMove("toRightTop");
                break;
            case 'toBottom':
                toBottom($(".cuadro-vacio"), $caja);
                saveStoryMove("toTop");
                break;
            case 'toRightBottom':
                toRightBottom($(".cuadro-vacio"), $caja);
                saveStoryMove("toLeftTop");
                break;
        }
        if($caja == "#inicio"){
            $(".paso-anterior").addClass("invisible");
            backMove = [];
        }
        
    });
    
    $(".volver-empezar").click(function() {
        var $caja = this.hash;
        toTop($(".cuadro-vacio"), $caja);  
    });

    //Devuelve la última caja que visitó el usuario
    function ultimoPaso(){
        long = backStory.length - 1;
        return backStory[long];
    }

    function ultimoPasoMove(){
        long = backMove.length - 1;
        return backMove[long];
    }
    //Elimina el último paso del historial del usuario
    function eliminaUltimoPaso(){
       backStory.pop();
    }

    function eliminaUltimoMove(){
        backMove.pop();
    }

    $(".paso-anterior").on("click", function(e){
        
        $caja = this.hash;
        
        //var $movimiento = $(this).attr("data-animacion");
        $movimiento = ultimoPasoMove();
        $(this).attr("data-animacion", ultimoPasoMove());
        eliminaUltimoMove();
        switch ($movimiento)
        {
            case 'toLeftTop':
                toLeftTop($(".cuadro-vacio"), $caja);
                break;
            case 'toTop':
                toTop($(".cuadro-vacio"), $caja);
                break;
            case 'toRightTop':
                toRightTop($(".cuadro-vacio"), $caja);
                break;
            case 'toLeft':
                toLeft($(".cuadro-vacio"), $caja);
                break;
            case 'toRight':
                toRight($(".cuadro-vacio"), $caja);
                break;
            case 'toLeftBottom':
                toLeftBottom($(".cuadro-vacio"), $caja);
                break;
            case 'toBottom':
                toBottom($(".cuadro-vacio"), $caja);
                break;
            case 'toRightBottom':
                toRightBottom($(".cuadro-vacio"), $caja);
                break;
        }
        eliminaUltimoPaso();
        $(this).attr("href", ultimoPaso());
        if($caja == "#inicio"){
            $(this).addClass("invisible");
        }

    });
    
    function rellenaDatos($enlace) {
        //Función que cumplimenta los datos en las cajas
        $estosDatos = settings.datos[$enlace];
        $(".cuadro-vacio").attr("id", "");
        $(".cuadro-vacio").attr("id", $enlace);
        $(".cuadro-vacio .pregunta p").text($estosDatos.pregunta).attr("class", $estosDatos.tipo);
        esquinas = ["toLeftTop", "toTop", "toRightTop", "toLeft", "toRight", "toLeftBottom", "toBottom", "toRightBottom"];
        for (i = 0; i < esquinas.length; i++) {
            
            marcador = esquinas[i];
            if ($estosDatos.respuestas[marcador] && $estosDatos.respuestas[marcador].texto !== "") { 
            //al comprobar las dos cosas permite que no tengan que pasarse todas las esquinas al definir los settings
                $(".cuadro-vacio ." + marcador + " a").text($estosDatos.respuestas[marcador].texto);
                $(".cuadro-vacio ." + marcador + " a").attr({
                    href: $estosDatos.respuestas[marcador].enlace
                });
                $(".cuadro-vacio ." + marcador).removeClass('invisible');
            }else{
                $(".cuadro-vacio ." + marcador).addClass('invisible');
            }
        }


    }



    /*###########Funciones que hacen el movimiento#######
     * LOS MOVIMIENTOS INDICAN HACIA DÓNDE VA LA CÁMARA
     * */

    function toBottom($box, caja) {

        
        $(".enMedio").animate({
            'top': '-200%'
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).removeClass("enMedio");
            $(this).css("top", "");
            $(this).css("left", "");
            $box.css("top", "200%");
            $box.css("left", 0);
            rellenaDatos(caja);
        });

  
        valorTop = parseInt($("#fondo").css("top")) + settings.velocidadFondo;
        $("#fondo").animate({
            'top': valorTop
        }, settings.tiempoFondo, settings.easeFondo);

      

        $box.animate({
            'top': 0,
            'left': 0
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).addClass("enMedio");
        });

    }

    function toTop($box, $caja) {

       
        $(".enMedio").animate({
            'top': '200%'
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).removeClass("enMedio");
            $(this).css("top", "");
            $(this).css("left", "");
            $box.css("top", "-200%");
            $box.css("left", 0);
            rellenaDatos($caja);
        });

       
        valorTop = parseInt($("#fondo").css("top")) - settings.velocidadFondo;
        $("#fondo").animate({
            'top': valorTop
        }, settings.tiempoFondo, settings.easeFondo);

        //Traemos la caja que llegará

        $box.animate({
            'top': 0,
            'left': 0
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).addClass("enMedio");
        });

    }

    function toLeft($box, $caja) {

       
        $(".enMedio").animate({
            'left': '200%'
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).removeClass("enMedio");
            $(this).css("top", "");
            $(this).css("left", "");
            $box.css("top", 0);
        $box.css("left", "-200%");
            
            rellenaDatos($caja);
        });

        
        valorLeft = parseInt($("#fondo").css("top")) - settings.velocidadFondo;
        $("#fondo").animate({
            'left': valorLeft
        }, settings.tiempoFondo, settings.easeFondo);

       

        $box.animate({
            'top': 0,
            'left': 0
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).addClass("enMedio");
        });

    }
    function toRight($box, $caja) {

        $(".enMedio").animate({
            'left': '-200%'
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).removeClass("enMedio");
            $(this).css("top", "");
            $(this).css("left", "");
            $box.css("top", 0);
        $box.css("left", "200%");
            rellenaDatos($caja);
        });

        valorLeft = parseInt($("#fondo").css("top")) + settings.velocidadFondo;
        $("#fondo").animate({
            'left': valorLeft
        }, settings.tiempoFondo, settings.easeFondo);


        $box.animate({
            'top': 0,
            'left': 0
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).addClass("enMedio");
        });

    }

    function toLeftTop($box, $caja) {

        $(".enMedio").animate({
            'top': '200%',
            'left': '200%'
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).removeClass("enMedio");
            $(this).css("top", "");
            $(this).css("left", "");
            $box.css("top", "-200%");
        $box.css("left", "-200%");
            rellenaDatos($caja);
        });

       
        valorTop = parseInt($("#fondo").css("top")) - settings.velocidadFondo;
        valorLeft = parseInt($("#fondo").css("left")) - settings.velocidadFondo;
        $("#fondo").animate({
            'top': valorTop,
            'left': valorLeft
        }, settings.tiempoFondo, settings.easeFondo);

  

        $box.animate({
            'top': 0,
            'left': 0
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).addClass("enMedio");
        });

    }

    function toRightTop($box, $caja) {

      
        $(".enMedio").animate({
            'top': '200%',
            'left': '-200%'
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).removeClass("enMedio");
            $(this).css("top", "");
            $(this).css("left", "");
            $box.css("top", "-200%");
        $box.css("left", "200%");
            rellenaDatos($caja);
        });

      
        valorTop = parseInt($("#fondo").css("top")) - settings.velocidadFondo;
        valorLeft = parseInt($("#fondo").css("left")) + settings.velocidadFondo;
        console.log(valorTop);
        $("#fondo").animate({
            'top': valorTop,
            'left': valorLeft
        }, settings.tiempoFondo, settings.easeFondo);



        $box.animate({
            'top': 0,
            'left': 0
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).addClass("enMedio");
        });

    }


    function toLeftBottom($box, $caja) {

        $(".enMedio").animate({
            'top': '-200%',
            'left': '200%'
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).removeClass("enMedio");
            $(this).css("top", "");
            $(this).css("left", "");

            $box.css("top", "200%");
            $box.css("left", "-200%");
            rellenaDatos($caja);
        });

    
        valorTop = parseInt($("#fondo").css("top")) + settings.velocidadFondo;
        valorLeft = parseInt($("#fondo").css("left")) - settings.velocidadFondo;
        $("#fondo").animate({
            'top': valorTop,
            'left': valorLeft
        }, settings.tiempoFondo, settings.easeFondo);


        $box.animate({
            'top': 0,
            'left': 0
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).addClass("enMedio");
        });

    }

    function toRightBottom($box, $caja) {

        $(".enMedio").animate({
            'top': '-200%',
            'left': '-200%'
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).removeClass("enMedio");
            $(this).css("top", "");
            $(this).css("left", "");
            $box.css("top", "200%");
        $box.css("left", "200%");
            rellenaDatos($caja);
        });

 
        valorTop = parseInt($("#fondo").css("top")) + settings.velocidadFondo;
        valorLeft = parseInt($("#fondo").css("left")) + settings.velocidadFondo;
        $("#fondo").animate({
            'top': valorTop,
            'left': valorLeft
        }, settings.tiempoFondo, settings.easeFondo);

        $box.animate({
            'top': 0,
            'left': 0
        }, settings.tiempoAnimacion, settings.easeElementos, function() {
            $(this).addClass("enMedio");
        });

    }


    
    
    
	}; //flowchartjs

}( jQuery ));