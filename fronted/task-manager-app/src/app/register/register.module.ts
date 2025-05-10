import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { LucideAngularModule, UserRoundPlus, KeyRound } from 'lucide-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    LucideAngularModule.pick({ UserRoundPlus, KeyRound }),
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
