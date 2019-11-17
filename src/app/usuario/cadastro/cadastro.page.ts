import { Component } from '@angular/core';
import * as $ from 'jquery';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-cadastro',
  templateUrl: 'cadastro.page.html',
  styleUrls: ['cadastro.page.scss']
})
export class cadastro {

  constructor() {}
  ngAfterViewInit(){
    
    //Eventos da página
    CarregaEventos();          
    
    function CarregaEventos(){
      EnviarFormCadUsuario();
      HabilitarSegundaPaginaCadastro(false);
      ProsseguirSegundaPaginaCadastro();
      voltarPaginaInicialCadastro();
    };

    //Envia dados do cadastro
    function EnviarFormCadUsuario(){      
      $('#btnCadastrar').off().on('click', function (e) {
        console.log($("#inputEndereco").val());            
        var objCadastro = {
          nome : $("#inputNomUsuario").val(),
          datnascimento : $("#inputDatNascUsuario").val(),
          email : $("#inputEmailUsuario").val(),
          celular : $("#inputCelularUsuario").val(),
          senha : $("#inputSenhaUsuario").val(),
          endereco: $("#inputEndereco").val(),
          cidade: $("#inputCidade").val(),
          estado: $("#inputEstado").val(),
          cep: $("#inputCep").val()
        }    
        console.log(objCadastro);            
        var camposInvalidos = ValidaCamposCadUsuario();
        if(camposInvalidos == "" || camposInvalidos == null || camposInvalidos == undefined ){                    
          e.preventDefault();                                
          $.ajax({            
            type: "POST",
            contentType: "application/json",
            url: "https://localhost:44376/api/Usuario/CadastrarUsuario",                                    
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
          url: "https://localhost:44376/api/Usuario/Login",
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

    
    function ProsseguirSegundaPaginaCadastro(){
      $("#btnProsseguirCadastro").off().on('click',function(){
        HabilitarSegundaPaginaCadastro(true);
      });
    }

    function HabilitarSegundaPaginaCadastro(habilita){
      console.log(habilita);
      if (habilita) {
        
        $("#lblNome").hide();    
        $("#cardSubCadastroNome").hide();
        $("#lblDatNascimento").hide();
        $("#cardSubCadastroDatNascimento").hide();
        $("#lblEmail").hide();
        $("#cardSubCadastroEmail").hide();        
        $("#lblCelular").hide();
        $("#cardSubCadastroCelular").hide();
        $("#lblSenha").hide();
        $("#cardSubCadastroSenha").hide();
        $("#iconeVoltar").show();
        $("#btnCadastrar").show();

        $("#lblEndereco").show();
        $("#cardSubCadastroEndereco").show();        
        $("#lblCidade").show();        
        $("#cardSubCadastroCidade").show();              
        $("#lblEstado").show();
        $("#cardSubCadastroEstado").show();
        $("#lblCep").show();
        $("#cardSubCadastroCep").show();         
        $("#btnProsseguirCadastro").hide();    
        
      } else {
        
        $("#lblNome").show();    
        $("#cardSubCadastroNome").show();
        $("#lblDatNascimento").show();
        $("#cardSubCadastroDatNascimento").show();
        $("#lblEmail").show();
        $("#cardSubCadastroEmail").show();        
        $("#lblCelular").show();
        $("#cardSubCadastroCelular").show();
        $("#lblSenha").show();
        $("#cardSubCadastroSenha").show();  
        $("#btnProsseguirCadastro").show();  

        $("#lblEndereco").hide();
        $("#cardSubCadastroEndereco").hide();
        $("#lblCidade").hide();
        $("#cardSubCadastroCidade").hide();
        $("#lblEstado").hide();
        $("#cardSubCadastroEstado").hide();
        $("#lblCep").hide();
        $("#cardSubCadastroCep").hide(); 
        $("#btnCadastrar").hide();    
        $("#iconeVoltar").hide();         
      }                 
    }

    function voltarPaginaInicialCadastro(){
      $("#iconeVoltar").off().on('click',function(){
        HabilitarSegundaPaginaCadastro(false);
      });
    }
  }
}