import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgZone} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;
declare let hiveManager:HivePlugin.HiveManager;

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  public cid:string = "";
  public contentSize:string="";
  public showCurrentImage:string="";
  public ipfs:any="";
  public isShow =false;
  constructor(public route:ActivatedRoute,public navCtrl: NavController,public zone:NgZone) {

  }

  ngOnInit() {
    if(this.ipfs === ""){
    this.getIpfs().then((res)=>{
      this.route.queryParams.subscribe((data)=>{
        this.ipfs = res;
        this.cid = data["cid"];
        this.getSizeIpfs(this.cid);
        this.getStringIpfs(this.cid);
      });
    }).catch((err)=>{
        alert(err);
    });
  }
  }

  ionViewDidEnter() {
    // When the main screen is ready to be displayed, ask the app manager to make the app visible,
    // in case it was started hidden while loading.
    appManager.setVisible("show");
    // Update system status bar every time we re-enter this screen.
    titleBarManager.setTitle("imagePage");
    titleBarManager.setBackgroundColor("#000000");
    titleBarManager.setForegroundMode(TitleBarPlugin.TitleBarForegroundMode.LIGHT);
   }

   createClient(){
    return new Promise((resolve, reject) => {
      try {
        let options:any =   {
          driveType:"3"
         };
        hiveManager.createClient(()=>{
        },options,(res)=>{
         resolve(res);
        },(err)=>{
          reject("err:"+err);
        });
       }
       catch(err){
      reject("err:"+err);
       }
    });
  };

  getIpfs(){
    return new Promise((resolve, reject) => {
      this.createClient().then((client:any)=>{
        try{
          client.getIPFS((info:any)=>{
           this.ipfs = info;
           resolve(this.ipfs);
          },(err: string)=>{
            reject("err:"+err);
          });
        }catch(err){
          reject("err:"+err);
        }
      }).catch((err)=>{
        reject("err:"+err);
      });
    });
  }


  getStringIpfs(cid){
    this.isShow = true;
    // {
    //   "status": "success",
    //   "content": "sssssssss",
    //   "hid": null
    // }
    this.ipfs.get(cid).then((res:any)=>{
      if(res["status"] === "success"){
        this.showCurrentImage = res["content"];
        this.isShow = false;
      }
    }).catch((err: string)=>{
      alert("err"+err);
    });
  }

  getSizeIpfs(cid){
    // {
    //   "status": "success",
    //   "length": 9,
    //   "hid": null
    // }
    this.ipfs.size(cid).then((res:any)=>{

      if(res["status"] === "success"){
        this.contentSize = res["length"];
      }
    }).catch((err: string)=>{
        alert("err"+err);
    });
  }

  back(){
    this.navCtrl.back();
  }

}
