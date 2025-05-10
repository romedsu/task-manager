import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { LucideAngularModule, User,Calendar,CircleCheck,Pencil, Trash} from 'lucide-angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule,
    LucideAngularModule.pick({ User,Calendar,CircleCheck,Pencil,Trash }),
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
