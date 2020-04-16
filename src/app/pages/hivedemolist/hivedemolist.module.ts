import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HivedemolistPage } from './hivedemolist.page';

const routes: Routes = [
  {
    path: '',
    component: HivedemolistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HivedemolistPage]
})
export class HivedemolistPageModule {}
