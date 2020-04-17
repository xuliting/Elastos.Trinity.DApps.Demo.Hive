import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'picturedetails', loadChildren: './pages/picturedetails/picturedetails.module#PicturedetailsPageModule' },
  { path: 'picturelist', loadChildren: './pages/picturelist/picturelist.module#PicturelistPageModule' },
  { path: 'onboard', loadChildren: './pages/onboard/onboard.module#OnboardPageModule' },
  { path: 'hivedemolist', loadChildren: './pages/hivedemolist/hivedemolist.module#HivedemolistPageModule' },
  { path: 'keyvalues', loadChildren: './pages/keyvalues/keyvalues.module#KeyvaluesPageModule' },
  { path: 'onedrivefiles', loadChildren: './pages/onedrivefiles/onedrivefiles.module#OnedrivefilesPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
