import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FeedbackService } from '../services/feedback.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  username = '';
  password = '';
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent,
    private feedbackService: FeedbackService,
  ) {}

  
  
  
      // ---v2----
      async login() {
        // Validación de campos
        if (!this.username || !this.password) {
          await this.feedbackService.msjFeedback('❌ Campos incompletos | Introduzca los datos','red');
          return;
        }
        
        // Llamada al servicio de autenticación
        this.authService.login(this.username, this.password).subscribe({
          next: async () => {
            await this.feedbackService.msjFeedback('✅ Inicio de sesión ','green');
            this.username='';
            this.password='';
            
            //al loguarte te lleva a esta ruta
            this.router.navigate(['/home']);
          },
      error: async () => {
        await this.feedbackService.msjFeedback('❌ Usuario o contraseña incorrectos','red');
        this.username='';
        this.password='';
      },
    });
  }
  
  
  // // register(){
    // //   this.authService.register(this.username,this.password).subscribe (()=>{
      // //     this.router.navigate(['/home']);
      // //   });
      // // }
      
      
  
  
  // Cambiar el título al entrar a la página
  ionViewWillEnter() {
    this.appComponent.titulo = 'Iniciar sesión';
  }
}


