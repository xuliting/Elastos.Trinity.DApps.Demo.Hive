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

  public version:string = "";
  public keyValuesObj:HivePlugin.KeyValues = null;
  public method = [
    { "name": "putValue" },
    { "name": "getValue" },
    { "name": "deleteKey" }
  ];

  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public hiveService: HiveService,
  ) {}

  ngOnInit() { 
    this.addBack();
  }

  ionViewDidEnter(){
    
    appManager.setVisible("show");
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
        console.log("==msg==getValue");
          break;
      case "deleteKey":
          
          break;        
    }
  }

  putValue():void {
    console.log("==msg==putValue33"+this.keyValuesObj); 
    try {  
      this.hiveService.putValue(this.keyValuesObj,"testKey","testValue").then((result) => {
        console.log("==msg==" + result);
      }).catch((err)=>{
          alert(err);
      });
    } catch(err) {
      console.log("==msg111==" + err);
    } 
  }


  addBack():void {
    /**
     * msgobject：{
        "message": "navback",
          "type": 1,
          "from": "elastos.trinity.dApps.demo.hive"
        }
      */
    titleBarManager.setNavigationMode(TitleBarPlugin.TitleBarNavigationMode.BACK);
    appManager.setListener((msg) => {
      if(msg["message"] === "navback"){
          this.navCtrl.pop();
      }
    });
  }
}
