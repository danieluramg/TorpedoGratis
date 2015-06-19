// ==UserScript==
// @name	TorpedoGratis
// @description	Limpa site Torpedogratis.org deixando somente o formulario
// @author	daniel.uramg@gmail.com
// @version	0.18
// @downloadURL	https://raw.githubusercontent.com/danieluramg/TorpedoGratis.net/master/torpedogratis.js
// @require	http://ideias.2p.fm/userscripts/jquery-2.1.1.min.js
// @match	http://*.torpedogratis.org/*
// @match	http://qualoperadora.info/widget
// @run-at	document-body
// ==/UserScript==

$(document).ready(function(){


    if (location.href == 'http://torpedogratis.org/'){ //pagina principal

        var form = $('#formulario').html(); //variavel com o formulario pronto
        $('body').remove(); //remove todo o corpo da pagina
        $('head').after('<div id="formulario" class="default-content">' + form + '</div>'); //injeta a div do form abaixo do cabeçalho

        $('#Numero_Remetente').attr('value', '32012524');
        $('#Nome_Remetente').attr('value', 'Digipaper');
        $('#Mensagem').removeAttr('onblur onfocus onkeypress');
        $("select").find("option[value='61']").prop("selected",true);

        //Injeta form do QualOperador acima do form do Torpedo        
        $('#formulario').before('<br><iframe src="http://qualoperadora.info/widget" width="280" height="200" frameborder="0" scrolling="no"></iframe><hr>');

        $('form').submit(function(event){
            console.log("submetido");
            var $x = $('form').serializeArray(), destino = [], mensagem = [], ddd = [];
            $.each($x, function(i, field){
                switch (field.name){
                    case 'campoCEL_d':
                        dst = field.value;
                        destino.push(dst);
                        break;
                    case 'campoSMS':
                        msg = field.value;
                        mensagem.push(msg);
                        break;
                    case 'campoDDD_d':
                        dd = field.value;
                        ddd.push(dd);
                }

            });

            url_post = 'http://ideias.2p.fm/smstodb.cgi'
            $.ajax({
                type: "post",
                url: url_post,
                data: {TEL: ddd + destino, MSG: "" + mensagem},
            })
        })
    }

    if (location.href == 'http://torpedogratis.org/captcha'){ //Pagina do Captcha

        $('#right').remove();
        $('#mini-header').remove();
        $('#menu').remove();
        $('#social').remove();
    }
    
    if (location.href == 'http://torpedogratis.org/sucesso'){ //Pagina de Sucesso
        
        var form = $('#formulario').html(); //variavel com a imagem de sucesso
        $('body').remove(); //remove todo o corpo da pagina
        $('head').after('<div id="formulario" class="default-content">' + form + '</div>');
    }
})
