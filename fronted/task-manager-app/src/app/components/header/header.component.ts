import { Component, OnInit } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // imports: [IonicModule, RouterModule],
})
export class HeaderComponent  implements OnInit {
  titulo:string ='Título';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {}

    logout() {
    this.authService.logout();
  }

}
