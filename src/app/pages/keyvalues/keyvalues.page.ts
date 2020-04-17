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
  public mName:string = "";
  public keyValuesObj:HivePlugin.KeyValues = null;
  public method = [
    { "name": "putValue" },
    { "name": "setValue" },
    { "name": "getValues"},
    { "name": "deleteKey"}
  ];

  public content:string = "";

  public testKey:string = "test";

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
    this.content = "";
    this.mName ="";  
    switch(name){
      case "putValue":
          this.mName = "putValue";
          this.putValue();
          break;
      case "setValue":
          this.mName = "setValue";
          this.setValue();
          break;    
      case "getValues":
        this.mName = "getValues";  
        this.getValues();
          break;
      case "deleteKey":
        this.mName = "deleteKey";   
        this.deleteKey();  
          break;        
    }
  }

  putValue():void { 
    try {  
      this.hiveService.putValue(this.keyValuesObj,this.testKey,"testValue").then((result) => {
        this.content = JSON.stringify(result);
      }).catch((err)=>{
          alert(err);
      });
    } catch(err) {
       alert(JSON.stringify(err));
    } 
  }

  setValue():void{
    try {  
        this.hiveService.setValue(this.keyValuesObj,this.testKey,"testValue111").then((result) => {
          this.content = JSON.stringify(result);
        }).catch((err)=>{
            alert(err);
        });
      } catch(err) {
          alert(JSON.stringify(err));
      }  
  }

  getValues():void{
    try {  
        this.hiveService.getValues(this.keyValuesObj,this.testKey).then((result) => {
          this.content = JSON.stringify(result);
        }).catch((err)=>{
            alert(err);
        });
      } catch(err) {
           alert(JSON.stringify(err));
      } 
  }

  deleteKey():void{
    try {  
        this.hiveService.deleteKey(this.keyValuesObj,this.testKey).then((result) => {
            this.content = JSON.stringify(result);
        }).catch((err)=>{
            alert(err);
        });
      } catch(err) {
         alert(JSON.stringify(err));
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

  ionViewDidLeave(){
    this.keyValuesObj = null;
}
}
