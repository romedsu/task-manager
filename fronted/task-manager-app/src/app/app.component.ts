import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  titulo:string ='Título';


  constructor(
    private authService: AuthService,
  ) {}

  logout() {
    this.authService.logout();
  }

}
