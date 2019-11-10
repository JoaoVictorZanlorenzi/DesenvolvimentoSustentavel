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
    CarregaEventos();  
    
    
    //Eventos
    function CarregaEventos(){
      EnviarFormCadUsuario();
    };

    function EnviarFormCadUsuario(){      
      $('#frmCadUsuario').submit(function(e) {
        var camposInvalidos = ValidaCamposCadUsuario();
        if(camposInvalidos == "" || camposInvalidos == null || camposInvalidos == undefined ){                    
          e.preventDefault();                                
          $.ajax({            
            type: "POST",
            contentType: "application/json",
            url: "https://localhost:44376/api/Teste/CadastrarUsuario",                                    
            data: JSON.stringify($(this).serialize()),
            dataType: 'JSON',
            success: function(response){
                alert(response);
                if(response == 'OK'){
                  //Prosseguir com o login
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

    //Validações
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
    }
  }
}