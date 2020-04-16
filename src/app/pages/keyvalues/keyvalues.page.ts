import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgZone} from '@angular/core';
import { HiveService } from 'src/app/services/hive.service';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

@Component({
  selector: 'app-keyvalues',
  templateUrl: './keyvalues.page.html',
  styleUrls: ['./keyvalues.page.scss'],
})
export class KeyvaluesPage implements OnInit {
  public version:string="";
  public keyValuesObj:HivePlugin.KeyValues = null;
  public method = [{"name":"putValue"},{"name":"getValue"},{"name":"deleteKey"}];
  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public hiveService: HiveService
   ){
    
  }

  ngOnInit() {
      this.addBack();
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
      titleBarManager.setNavigationMode(TitleBarPlugin.TitleBarNavigationMode.BACK);
      if(this.keyValuesObj === null){
          this.hiveService.getKeyValuesObj().then(
              (keyValuesObj:HivePlugin.KeyValues)=>{
                  this.keyValuesObj = keyValuesObj;
          }).catch((err)=>{
                 alert(err);
          });
      }
  }

  handleMethod(name:string):void{
    switch(name){
        case "putValue":
            this.putValue();
            break;
        case "getValue":

            break;
        case "deleteKey":
           
             break;        
    }
  }
    putValue():void {
      console.log("==msg==putValue33"+JSON.stringify(this.keyValuesObj)); 
      try{  
        this.hiveService.putValue(this.keyValuesObj,
            "testKey","testValue").then((result)=>{
              console.log("==msg=="+result);
        });
      }catch(err){
         console.log("==msg111=="+err);
      } 
     
    }


  addBack():void{
    /**
     * msgobject：{
        "message": "navback",
         "type": 1,
         "from": "elastos.trinity.dApps.demo.hive"
        }
     */
  titleBarManager.setNavigationMode(TitleBarPlugin.TitleBarNavigationMode.BACK);
  appManager.setListener((msg)=>{
      if(msg["message"] === "navback"){
           this.navCtrl.pop();
      }
   });
}

}
