import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'picturedetails', loadChildren: './pages/picturedetails/picturedetails.module#PicturedetailsPageModule' },
  { path: 'picturelist', loadChildren: './pages/picturelist/picturelist.module#PicturelistPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
