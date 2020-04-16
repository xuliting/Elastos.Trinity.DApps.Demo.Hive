import { Component } from '@angular/core';
import { Platform , NavController} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { HiveService } from './services/hive.service';


@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private navController: NavController,
    private hiveService: HiveService
   ){
     this.initializeApp();          
   }

  initializeApp() {
    this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.hiveService.init();
  
        // Make sure to wait for platform to be ready before navigating to the first screen. Otherwise
        // plugins such as AppManager or TitleBarManager are not ready.
        //router.navigate(["tab1Root"]);
        this.navController.navigateRoot("/hivedemolist");
      });
  }

}
