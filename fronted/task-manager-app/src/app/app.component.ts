import { Component } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

import { FeedbackService } from './services/feedback.service';





@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
 

})
export class AppComponent {
  titulo:string ='Título';
  esLogin:boolean=false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private feedbackService:FeedbackService,
  ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        // Detectar si la ruta actual es "/login"
        this.esLogin = event.url === '/login' || event.url=== '/register';
        // this.titulo = this.esLogin ? 'Bienvenido' : 'Mis Tareas2';
      }
    });


  }

  async logout() {
    await this.feedbackService.msjFeedback('✅ Sesión cerrada','green');
    this.authService.logout();
    
  }



}
