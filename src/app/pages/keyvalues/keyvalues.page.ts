import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgZone} from '@angular/core';
import { HiveService } from 'src/app/services/hive.service';
import { HiveDemoService } from 'src/app/services/hivedemo.service';

declare let appManager: AppManagerPlugin.AppManager;

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
    public hiveDemoService: HiveDemoService
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter(){
    appManager.setVisible("show");

    if(this.keyValuesObj === null){
      this.hiveService.getKeyValuesObj().then(
          (keyValuesObj:HivePlugin.KeyValues)=>{
              this.keyValuesObj = keyValuesObj;
      }).catch((err)=>{
              alert(err);
      });
    }
  }

  ionViewWillEnter() {
    this.hiveDemoService.setTitleBarBackKeyShown(true);
  }

  ionViewWillLeave() {
    this.hiveDemoService.setTitleBarBackKeyShown(false);
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

  ionViewDidLeave(){
   let client = this.hiveService.getClientObj();
   if(client!=null){
       client.disConnect((info:string)=>{

       },(err)=>{
          alert(err);
       });
   }
    this.keyValuesObj = null;
}
}
