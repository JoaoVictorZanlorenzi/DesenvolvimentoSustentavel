import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-paginaInicial',
  templateUrl: 'paginaInicial.page.html',
  styleUrls: ['paginaInicial.page.scss']
})
export class paginaInicial implements OnInit {
  private selectedItem: any;

  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() { 
  }
  ngAfterViewInit(){  
    
    //OnClick entrar- vai para tela de login
    $("#entrar").off().on('click', function(){

      document.location.href = "http://localhost:8100/tabs/tab1";
  
    });

    //OnClick - vai para tela de cadastro.
    $("#cadastreSe").off().on('click', function(){

      document.location.href = "http://localhost:8100/tabs/tab3";
  
    });
  
}
ngOnInit(){

}
 

}
