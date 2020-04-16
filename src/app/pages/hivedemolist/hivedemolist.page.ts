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
    public version: string = "";
    //demo List
    public demoList = [{"name":'IPFS',"type":"0"},
                       {"name":'onedrive',"type":"1"},
                       {"name":'KeyValue',"type":"2"},
                      ];
    constructor(
        public navCtrl: NavController,
        public zone: NgZone,
        public hiveService: HiveService
       ){
        
      }

  ngOnInit(){
   
  }

  getVersion(){
    this.hiveService.getVersion().then((version:string)=>{
        this.version = version;
        titleBarManager.setTitle('Hive Demo ' + this.version.slice(16,19));
     }).catch(()=>{

     });
  }

  ionViewDidEnter(){
    // When the main screen is ready to be displayed, ask the app manager to make the app visible,
      // in case it was started hidden while loading.
      this.getVersion();
      appManager.setVisible("show");

      // Update system status bar every time we re-enter this screen.
      titleBarManager.setBackgroundColor("#ff9f46");
      titleBarManager.setForegroundMode(TitleBarPlugin.TitleBarForegroundMode.LIGHT);
      titleBarManager.setNavigationMode(TitleBarPlugin.TitleBarNavigationMode.HOME);
  }

  /*0 =>IPFS
    1 =>onedrive
    2 =>KeyValue
  */
  go(demoType:string):void{
     switch(demoType){
         case "0":
            this.navCtrl.navigateForward("/picturelist");
             break;
         case "1":
             break;
             case "0":
                break;
         case "2":
              break;        
     }
  }

}
