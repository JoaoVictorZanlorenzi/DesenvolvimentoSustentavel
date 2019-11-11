import { Component } from '@angular/core';
import * as $ from 'jquery';


@Component({
 selector: 'app-tab1',
 templateUrl: 'tab1.page.html',
 styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  ngAfterViewInit(){

    $("#frmLogin").submit(function(e){
      var camposInvalidos = ValidaCamposLogin();
      if(camposInvalidos == "" || camposInvalidos == null || camposInvalidos == undefined ){
        e.preventDefault();                                
        $.ajax({            
          type: "POST",
          contentType: "application/json",
          url: "https://localhost:44376/api/Teste/Login",                                    
          data: JSON.stringify($(this).serialize()),
          dataType: 'JSON',
          success: function(response){
              alert(response);            
          },
          error: function(){
            alert("Usuário ou senha inválidos");
          }
        });
      }else{
        alert('Por favor, preencha os campos a seguir:\n'+camposInvalidos);
      }
    });

    function ValidaCamposLogin(){
      var camposInvalidos = "";
      var emailUsuario = $("#inputLoginEmail").val();      
      var senhaUsuario = $("#inputLoginSenha").val();
      
      if (emailUsuario == "" || emailUsuario == null || emailUsuario == undefined)
        camposInvalidos += 'Email\n';

      if (senhaUsuario == "" || senhaUsuario == null || senhaUsuario == undefined)
        camposInvalidos += 'Senha\n';
      
      return camposInvalidos;
      };  
    }
  }

