import { Component } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
  ) { }

  ngAfterViewInit() {    
    CarregaEventosPagina();

    function CarregaEventosPagina(){
      carregaUsuario();
      buscaEventosDestaques();
      buscaGruposRecentes();
    }

    function carregaUsuario() {
      var usuario = JSON.parse(ObterObjetoStorage(localStorage, 'usuarioSession'));
      //Objeto retornado:

      //Preencher campos com dados retorna //
      console.log(usuario);
      $("#nomUsuario").text(usuario.nome);
      $("#inputEmail").val(usuario.email);
      $("#inputEndereco").val(usuario.endereco);
      $("#inputCidade").val(usuario.cidade);
      $("#inputEstado").val(usuario.estado);
      $("#inputDatNascimento").val(usuario.datnascimento);
      
    }
    //busca Grupos Recentes
    function buscaGruposRecentes() {
      var request = $.ajax({
        type: "GET",
        contentType: "application/json; charset-utf-8",
        url: "https://localhost:44376/api/Evento/BuscaGruposRecentes"
      });
      request.done(function (data) {       
        GruposRecentes(JSON.parse(data));
      });
      request.fail(function(data){
      alert("erro ao carregar gruposRecentes");
      });
    }

    //busca eventos destaques
    function buscaEventosDestaques() {
      // var request = 
      var request= $.ajax({
        type: "GET",
        contentType: "application/json; charset-utf-8",
        url: "https://localhost:44376/api/Evento/BuscaEventoDestaque"
      });
      request.done(function (data) {       
        EventoDestaque(JSON.parse(data));
      });
      request.fail(function(data){
      alert("erro ao carrega Evento destaque");
      });
      // request.done(function (data) {
      //   EventoDestaque(data);
      //   alert("sucesos" + data.DscEvento);
      // });
      // request.fail(function(data){
      // alert("erro");
      // });
    }
    //onclick em determinado grupo-  vai para tela do grupo
    $("#cardGruposRecentes").off('click').on('click', function () {
      var codigo = $("#cardGruposRecentes #codigoGrupo").val()
      alert("vai pagina grupo de codigo: " + codigo);
        });

    //recentes2
    $("#cardGruposRecentes2").off('click').on('click', function () {
      var codigo = $("#cardGruposRecentes2 #codigoGrupo2").val()
      alert("vai pagina grupo de codigo: " + codigo);
      //chamada ajax passa codigo como parametro

    });    

    //simulação eventos destaque
    function EventoDestaque(Evento) {
      $("#cardEventosDestaque").css("background-image", "url(/assets/praia.png)");
      $("#descEventoDestaque").text(Evento.DscEvento +"  dia "+Evento.DatInicioEvento);
      $("#descEventoDestaque").val(Evento.CodEvento)
    }
    $("#cardEventosDestaque").off().on('click', function(){
      var codigo = $("#descEventoDestaque").val()
      alert("Go to page evento cod: "+codigo );

    })
    //simulação grupos recentes
    function GruposRecentes(GrupoRecente) {
      var img = ["lixoNeve.jpg", "praia.png"];
      var teste = $("#cardGruposRecentes");
      var teste2 = $("#cardGruposRecentes2");
      var aux = "url(/assets/" + img + ")";

      $("#descGrupoRecente").text(GrupoRecente[0].DscEvento);
      $("#codigoGrupo").val((GrupoRecente[0].CodEvento));
      if(GrupoRecente.length > 0){
      $("#descGrupoRecente2").text(GrupoRecente[1].DscEvento);
      $("#codigoGrupo2").val((GrupoRecente[1].CodEvento));
    }  
      teste.css("background-image", "url(/assets/" + img[0] + ")");
      teste2.css("background-image", "url(/assets/" + img[1] + ")");
      }
    /**
     * Obtém valor do storage
     */
    function ObterObjetoStorage(storage, key) {
      var result = storage.getItem(key);
      return result;
    }
  }
}

