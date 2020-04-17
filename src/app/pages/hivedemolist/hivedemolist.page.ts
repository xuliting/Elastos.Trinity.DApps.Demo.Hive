import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgZone} from '@angular/core';
import { HiveService } from 'src/app/services/hive.service';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

@Component({
  selector: 'app-hivedemolist',
  templateUrl: './hivedemolist.page.html',
  styleUrls: ['./hivedemolist.page.scss'],
})
export class HivedemolistPage implements OnInit {

  // Demo List
  public demoList = [
    { "name": 'IPFS', "type": "0" },
    { "name": 'One Drive Files', "type": "1" },
    { "name": 'One Drive KeyValue', "type": "2" },
  ];

  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public hiveService: HiveService
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter(){
    // When the main screen is ready to be displayed, ask the app manager to make the app visible,
    // in case it was started hidden while loading.
    appManager.setVisible("show");

    // Update system status bar every time we re-enter this screen.
    titleBarManager.setTitle('Hive Demo ' + this.hiveService.version.slice(16,19));
    titleBarManager.setBackgroundColor("#ff9f46");
    titleBarManager.setForegroundMode(TitleBarPlugin.TitleBarForegroundMode.LIGHT);
    titleBarManager.setNavigationMode(TitleBarPlugin.TitleBarNavigationMode.HOME);
  }

  /*
    0 =>IPFS
    1 =>onedrive
    2 =>KeyValue
  */
  go(demoType: string):void {
    switch(demoType) {
      case "0":
        this.navCtrl.navigateForward("/picturelist");
          break;
      case "1":
        this.navCtrl.navigateForward("/onedrivefiles"); 
          break;
      case "2":
        this.navCtrl.navigateForward("/keyvalues");
          break;        
    }
  }
}
