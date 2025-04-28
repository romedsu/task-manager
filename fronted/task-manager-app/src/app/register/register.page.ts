import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent,
    private feedbackService: FeedbackService
  ) {}

  // register(){
  //   if(!this.username || !this.password){
  //     alert('Campos incompletos. Introduzca los datos');
  //     return;
  //   }

  //   this.authService.register(this.username, this.password).subscribe(()=>{
  //     alert('Usuario creado con éxito');
  //     this.router.navigate(['/home']);
  //   }
  // );
  // }

  ngOnInit() {}

  ionViewWillEnter() {
    this.appComponent.titulo = 'Registrar usuario';
  }

  // v2
  async register() {
    // Validación de campos
    if (!this.username || !this.password) {
      await this.feedbackService.msjFeedback(
        '❌ Campos incompletos | Introduzca los datos',
        'red'
      );
      return;
    }

    // Llamada al servicio de autenticación
    this.authService.register(this.username, this.password).subscribe({
      next: async () => {
        await this.feedbackService.msjFeedback('✅ Usuario creado ', 'green');

        //tras registrarte, te loguea
        this.authService.login(this.username, this.password).subscribe({
          next: async () => {
            await this.feedbackService.msjFeedback(
              '✅ Usuario creado ',
              'green'
            );

            this.username = '';
            this.password = '';

            //al loguarte te lleva a esta ruta
            this.router.navigate(['/home']);
          },
          error: async () => {
            await this.feedbackService.msjFeedback('❌ Error al iniciar sesión automáticamente','red');
          },
        });
      },

      error: async () => {
        await this.feedbackService.msjFeedback('❌ Usuario o contraseña incorrectos','red');
      },
    });
  }
}
