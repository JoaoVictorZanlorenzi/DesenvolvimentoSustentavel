import { Component } from '@angular/core';
import * as $ from 'jquery';
import { bindCallback } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
  ) { }

  ngAfterViewInit() {
    //busca Grupos Recentes 
    function buscaGruposRecentes() {
      x();
    }

    //busca eventos destaques
    function buscaEventosDestaques() {
      y();
    }
    //onclick em determinado grupo-  vai para tela do grupo
    $("#cardGruposRecentes").off('click').on('click', function () {
      var codigo = $("#cardGruposRecentes #codigoGrupo").val()
      alert("vai pagina grupo de codigo: " + codigo);
      //chamada ajax passa codigo como parametro       

    });

    //recentes2
    $("#cardGruposRecentes2").off('click').on('click', function () {
      var codigo = $("#cardGruposRecentes2 #codigoGrupo").val()
      alert("vai pagina grupo de codigo: " + codigo);
      //chamada ajax passa codigo como parametro       

    });
    buscaEventosDestaques();
    buscaGruposRecentes();

    //simulação eventos destaque
    function y(){
      $(".cardEventosDestaque").css("background-image", "url(/assets/praia.png)")
      $("#descEventoDestaque").text("Limpeza da praia de Guaratuba no dia 28/07/2019.");
    }

    //simulação grupos recentes
    function x() {
      var img = ["lixoNeve.jpg", "praia.png"];
      var teste = $("#cardGruposRecentes");
      var teste2 = $("#cardGruposRecentes2");
      var aux = "url(/assets/" + img + ")";
      $("#descGrupoRecente").text("Limpeza ao redor do vulcao x");
      $("#descGrupoRecente2").text("Limpeza da praia de Guaratuba no dia 28/07/2019.");
      teste.css("background-image", "url(/assets/" + img[0] + ")");
      teste2.css("background-image", "url(/assets/" + img[1] + ")");
    }
  }
}
