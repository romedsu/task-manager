import { Injectable } from '@angular/core';
// import { ToastController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

import { LucideAngularModule, User } from 'lucide-angular';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  // constructor(private toastController:ToastController) { }

  constructor(private alertController: AlertController) {}


  //  // TOAST -> Método para mostrar mensaje de feedback
  //  public async msjFeedback(message: string, color: string) {
  //   const msj = await this.toastController.create({
  //     message: message,
  //     duration: 2000, 
  //     position: 'top', 
  //     color: 'custom', 
  //   });
  //   await msj.present();
  // }


  // ION-ALERT
  async msjFeedback(header: string, cssClass: string, buttons: any[] = ['OK']) {
    const alert = await this.alertController.create({
      header: header,
      // message: message,
      buttons: buttons,
      cssClass:cssClass,
    });

    await alert.present();
  }

}
