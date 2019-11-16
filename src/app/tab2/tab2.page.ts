import { Component } from '@angular/core';
import * as $ from 'jquery';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  ngAfterViewInit(){
    
    //Eventos da página
    CarregaEventos();          
    
    function CarregaEventos(){
      EnviarFormCadUsuario();
    };

    //Envia dados do cadastro
    function EnviarFormCadUsuario(){      
      $('#btnCadastrar').off().on('click', function (e) {
        var objCadastro = {
          nome : $("#inputNomUsuario").val(),
          datnascimento : $("#inputDatNascUsuario").val(),
          email : $("#inputEmailUsuario").val(),
          celular : $("#inputCelularUsuario").val(),
          senha : $("#inputSenhaUsuario").val()
        }                
        var camposInvalidos = ValidaCamposCadUsuario();
        if(camposInvalidos == "" || camposInvalidos == null || camposInvalidos == undefined ){                    
          e.preventDefault();                                
          $.ajax({            
            type: "POST",
            contentType: "application/json",
            url: "https://localhost:44376/api/Teste/CadastrarUsuario",                                    
            data: JSON.stringify(objCadastro),
            dataType: 'JSON',
            success: function(usuario){                
                if(usuario){
                  Login(usuario);
                }
            },
            error: function(){
              alert("failure");
            }
          });
        }else{
          alert('Por favor, preencha os campos a seguir:\n'+camposInvalidos);
        }        
    });        

    //Validações dos campos de cadastro
    function ValidaCamposCadUsuario(){
      var camposInvalidos = "";
      var nomeUsuario = $("#inputNomUsuario").val();
      var datNascUsuario = $("#inputDatNascUsuario").val();
      var emailUsuario = $("#inputEmailUsuario").val();
      var celUsuario = $("#inputCelularUsuario").val();
      var senhaUsuario = $("#inputSenhaUsuario").val();
      
      if (nomeUsuario == "" || nomeUsuario == null || nomeUsuario == undefined)
        camposInvalidos += 'Nome\n';
      if (datNascUsuario == "" || datNascUsuario == null || datNascUsuario == undefined)
        camposInvalidos += 'Data de nascimento\n';
      if (emailUsuario == "" || emailUsuario == null || emailUsuario == undefined)
        camposInvalidos += 'Email\n';
      if (celUsuario == "" || celUsuario == null || celUsuario == undefined)
        camposInvalidos += 'Nº Celular\n';
      if (senhaUsuario == "" || senhaUsuario == null || senhaUsuario == undefined)
        camposInvalidos += 'Senha\n';
      
      return camposInvalidos;
      };  


      /**
      *  Busca os dados na API de acordo com o login inserido
      */
      function Login(usuario){        
        $.ajax({
          type:"POST",
          contentType: "application/json",
          url: "https://localhost:44376/api/Teste/Login",
          data: usuario,
          dataType: 'JSON',
          success: function(data) {            
            iniciaSessaoUsuario(JSON.parse(data));
          },
          error: function() {
            
          }
        });

      }
    }

    //Guardando objeto de login na sessão
    function iniciaSessaoUsuario(usuario){      
      var usuarioSession = { 
        nome: usuario.NomUsuario,
        datnascimento: usuario.DatNascimento,
        email: usuario.Senha,
        celular: usuario.NumCelular,
        senha: usuario.Email     
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
  }
}