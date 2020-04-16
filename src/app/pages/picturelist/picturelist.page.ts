import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgZone} from '@angular/core';
import { HiveService } from 'src/app/services/hive.service';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;
declare let hiveManager:HivePlugin.HiveManager;

@Component({
  selector: 'app-picturelist',
  templateUrl: './picturelist.page.html',
  styleUrls: ['./picturelist.page.scss'],
})
export class PicturelistPage implements OnInit {

    public version: string = "ElastosHiveSDK-v0.2";
    public currentImage: any = "";
    public ipfs: any= "";
    public cidArr = [];
    public skey: string = "elastos.trinity.dApps.demo.hive";
    public isShowCamera = false;
    public isShowUpload = false;

    constructor(
      public navCtrl: NavController,
      public zone: NgZone,
      public hiveService: HiveService
     ){
      this.cidArr = this.getCidArr();
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
      // When the main screen is ready to be displayed, ask the app manager to make the app visible,
      // in case it was started hidden while loading.
      appManager.setVisible("show");

      // Update system status bar every time we re-enter this screen.
      titleBarManager.setTitle('Hive Demo ' + this.version.slice(16,19));
      titleBarManager.setBackgroundColor("#ff9f46");
      titleBarManager.setForegroundMode(TitleBarPlugin.TitleBarForegroundMode.LIGHT);
      titleBarManager.setNavigationMode(TitleBarPlugin.TitleBarNavigationMode.HOME);

      if(this.ipfs === ""){
        this.getIpfs();
      }
    }

    getIpfs(){
      return new Promise((resolve, reject) => {
        this.createClient().then((client: any) => {
          try{
            client.getIPFS((info: any) => {
             this.ipfs = info;
             resolve(this.ipfs);
            },(err: string) => {
              reject("err: " + err);
            });
          } catch (err) {
            reject("err: " + err);
          }
        }).catch((err) => {
          reject("err: " + err);
        });
      });
    }

    createClient(){
      return new Promise((resolve, reject) => {
        try {
          let options: any = {
            driveType: "3"
           };
          hiveManager.createClient(() => {
          }, options, (res) => {
           resolve(res);
          }, (err) => {
            reject("err: " + err);
          });
         }
         catch(err){
        reject("err: " + err);
         }
      });
    };
  
    getVersion(){
      hiveManager.getVersion((version: string) => { 
        this.version =  version;
      }, (err: string) => {
        alert("err:"+err);
      });
    }
  
    takePicture() {
      this.isShowCamera = true;
      this.currentImage = "";
      const options = {
        quality: 100,
        destinationType: 0,
        encodingType: 0,
        mediaType:0
      };
  
      navigator.camera.getPicture((imageData) => {
        this.zone.run(()=>{
          this.isShowCamera = false;
          this.currentImage = 'data:image/png;base64,' + imageData;
        });
      }, ((err) => {
        this.isShowCamera = false;
        console.log("Camera issue: " + err);
        this.currentImage ="";
      }), options);
    }
  
    putStringIpfs(str: string) {
      // {
      //   "status": "success",
      //   "cid": "QmVw47HJCmEtTou7c9d68iVJ1ce8Yxk4dAU1w5SGGWyyFh",
      //   "hid": null
      // }
      this.isShowUpload = true;
      this.ipfs.put(str).then((res:any) => {
          if(res["status"] === "success"){
            let cid = res["cid"];
            let obj = {"cid":cid,"no":(this.cidArr.length+1)}
            this.cidArr.push(obj);
            this.saveCidArr(this.cidArr);
            this.currentImage = "";
            this.isShowUpload = false;
          }
  
      }).catch((err: string) => {
        this.isShowUpload = false;
        alert("err" + err);
      });
    }
  
    saveCidArr(arr: any){
      localStorage.setItem(this.skey,JSON.stringify(arr))
    }
  
    getCidArr(){
     let arrStr = localStorage.getItem(this.skey) || "";
     if(arrStr === ""){
       return [];
      } else{
        return JSON.parse(arrStr);
       }
    }
  
    go(cid:string){
      this.navCtrl.navigateForward('/picturedetails', { queryParams: { "cid" : cid } });
    }
}
