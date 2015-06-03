// ==UserScript==
// @name	TorpedoGratis
// @description	Limpa site Torpedogratis.org deixando somente o formulario
// @author	daniel.uramg@gmail.com
// @version	0.17
// @downloadURL	https://raw.githubusercontent.com/danieluramg/TorpedoGratis.net/master/torpedogratis.js
// @require	http://ideias.2p.fm/userscripts/jquery-2.1.1.min.js
// @match	http://*.torpedogratis.org/*
// @match	http://qualoperadora.info/widget
// @run-at	document-body
// ==/UserScript==

$(document).ready(function(){

    $('#second-column').remove();
    $('#mini-header').remove();
    $('#menu').remove();
    $('#social').remove();
    $('#right').remove();
    $('#bottom-widget').remove();
    $('#Numero_Remetente').attr('value', '32012524');
    $('#Nome_Remetente').attr('value', 'Digipaper');
    $('#Mensagem').removeAttr('onblur onfocus onkeypress');
    $("select").find("option[value='61']").prop("selected",true);
    $('form:nth-child(1)').before('<br><iframe src="http://qualoperadora.info/widget" width="280" height="200" frameborder="0" scrolling="no"></iframe><hr>');
    $('#tel').attr('value', '61');

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
})
