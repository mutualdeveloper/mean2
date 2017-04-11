import { Component,OnInit } from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'MusiFy';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;

  constructor(private _userServices: UserService){
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    console.log(this.identity);
    console.log(this.token);
}
  
  public onSubmit(){
    // Conseguir los datos del usuario identificado
    this._userServices.signup(this.user).subscribe(
      response =>{
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){
          alert('el usuario no está correctamente identificado');
        }else{
          // Crear sesión en LocalStorage para tener al usuario en sesion
          localStorage.setItem('identity',JSON.stringify(identity));
          // Conseguir el token para enviarselo a cada peticion http
          this._userServices.signup(this.user, 'true').subscribe(
            response =>{
              let token = response.token;
              this.token = token;

              if(this.token.length <= 0){
                alert('El Token no se ha generado');
              }else{
                localStorage.setItem('token', token);
              }

            },
            error => {
              var errorMessage = <any> error;
              if(error != null){
                let body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(error);
              }
            }
          );
        }

      },
      error => {
        var errorMessage = <any> error;
        if(error != null){
          let body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;    
  }


}
