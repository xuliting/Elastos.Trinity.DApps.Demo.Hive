import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgZone} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HiveService } from 'src/app/services/hive.service';
declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

@Component({
  selector: 'app-picturedetails',
  templateUrl: './picturedetails.page.html',
  styleUrls: ['./picturedetails.page.scss'],
})
export class PicturedetailsPage implements OnInit {
    
    public cid:string = "";
    public contentSize: string = "";
    public showCurrentImage: string = "";
    public ipfsObj:HivePlugin.IPFS=null;
    public isShow = false;

    constructor(
      public route:ActivatedRoute,
      public navCtrl: NavController,
      public zone:NgZone,
      public hiveService: HiveService
     ){
      
    }
  
    ngOnInit() {
       this.init();
    }
  
    init():void{
      //Add Back listener
      this.addBack();
      if(this.ipfsObj === null){
        this.hiveService.getIpfsObject().then((ipfs:HivePlugin.IPFS)=>{
            this.ipfsObj = ipfs;
            this.route.queryParams.subscribe((data)=>{
                      this.cid = data["cid"];
                      this.getSizeIpfs(this.cid);
                      this.getStringIpfs(this.cid);
                      titleBarManager.setTitle(this.cid.slice(0,10) + '...' + this.cid.slice(40,50));
                     });
        }).catch((err)=>{
            alert(err);
        });

        }
    }
  
    ionViewDidEnter() {
      //this.init();
     }
  
    getStringIpfs(cid:string):void{
      this.isShow = true;
      this.hiveService.ipfsGet(this.ipfsObj,cid).then((result)=>{
        if(result["status"] === "success"){
            this.showCurrentImage = result["content"];
            this.isShow = false;
          }
      }).catch((err:string)=>{
              this.isShow = false;
              alert(err);
      });
    }
  
    getSizeIpfs(cid:string):void{
     this.hiveService.ipfsSize(this.ipfsObj,cid).then((result)=>{
        if(result["status"] === "success"){
            this.contentSize = result["length"];
          }
     }).catch((err:string)=>{
         alert(err);
     });
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

