import { Component } from '@angular/core';
import * as $ from 'jquery';


@Component({
 selector: 'app-login',
 templateUrl: 'login.page.html',
 styleUrls: ['login.page.scss']
})
export class login {

  constructor() {}

  ngAfterViewInit(){

    //Evento do click do botão
    $("#btnLogin").off().on('click', function(e){
      var camposInvalidos = ValidaCamposLogin();
      var usuarioLogin = {
        email: $("#inputLoginEmail").val(),
        senha: $("#inputLoginSenha").val()
      }
      if(camposInvalidos == "" || camposInvalidos == null || camposInvalidos == undefined ){
        e.preventDefault();                                
        $.ajax({            
          type: "POST",
          contentType: "application/json",
          url: "https://localhost:44376/api/Usuario/Login",                                    
          data: JSON.stringify(usuarioLogin),
          dataType: 'JSON',
          success: function(response){
            iniciaSessaoUsuario(JSON.parse(response));
          },
          error: function(){
            alert("Usuário ou senha inválidos");
          }
        });
      }else{
        alert('Por favor, preencha os campos a seguir:\n'+camposInvalidos);
      }
    });

    /**
    *  Inicia a sessão do usuário no storage
    */
    function iniciaSessaoUsuario(usuario){      
      var usuarioSession = { 
        nome: usuario.NomUsuario,
        datnascimento: usuario.DatNascimento,
        email: usuario.Senha,
        celular: usuario.NumCelular,
        senha: usuario.Email,
        endereco: usuario.Endereco.Endereco,
        cidade: usuario.Endereco.Cidade,
        estado: usuario.Endereco.Estado,
        cep: usuario.Endereco.Cep
      }      
      
      //Insere objeto no Storage  
      InserirItemStorage(localStorage,'usuarioSession', JSON.stringify(usuarioSession) , function(){        
        window.location.replace(window.location.origin + '/tabs/home');
      });
            
    }   
    /**
    *  Insere item no storage
    */
    function InserirItemStorage(storage, key, value, callback) {

      var result = storage.setItem(key, value);

      if (typeof callback == 'function') {
        callback();
      }                  
    }

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
    };      
  }

