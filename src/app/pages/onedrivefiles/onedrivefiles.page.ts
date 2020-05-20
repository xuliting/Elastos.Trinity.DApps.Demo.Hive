import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgZone} from '@angular/core';
import { HiveService } from 'src/app/services/hive.service';
import { HiveDemoService } from 'src/app/services/hivedemo.service';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

@Component({
  selector: 'app-onedrivefiles',
  templateUrl: './onedrivefiles.page.html',
  styleUrls: ['./onedrivefiles.page.scss'],
})
export class OnedrivefilesPage implements OnInit {

    public version:string = "";
    public mName:string = "";
    public fileObj:HivePlugin.Files = null;
    public method = [
      { "name": "filePut" },
      { "name": "fileGetAsString"},
      { "name": "fileSize"},
      { "name": "deleteFile"},
      { "name": "fileList"},
    ];

    public content:string = "";

    public fileName:string = "test";

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

      if(this.fileObj === null){
        this.hiveService.getFilesObj().then(
            (fileObj:HivePlugin.Files)=>{
                this.fileObj = fileObj;
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
        case "filePut":
            this.mName = "filePut";
            this.filePut();
            break;
        case "fileGetAsString":
            this.mName = "fileGetAsString";
            this.fileGetAsString();
            break;
        case "fileSize":
            this.mName = "fileSize";
            this.fileSize();
            break;
        case "deleteFile":
            this.mName = "deleteFile";
            this.deleteFile();
            break;
        case "fileList":
            this.mName = "fileList";
            this.fileList();
                break;
      }
    }

    filePut():void{
       this.hiveService.filePut(this.fileObj,
        this.fileName,
        "tttttttttttttttttttt").then((result)=>{
        this.content = JSON.stringify(result);
        }).catch((err)=>{
             alert(err);
        });
    }

    fileGetAsString():void{
        this.hiveService.fileGetAsString(this.fileObj,
            this.fileName).then((result)=>{
            this.content = JSON.stringify(result);
            }).catch((err)=>{
                 alert(err);
            });
    }

    fileSize():void{
        this.hiveService.fileSize(this.fileObj,
            this.fileName).then((result)=>{
            this.content = JSON.stringify(result);
            }).catch((err)=>{
                 alert(err);
            });
    }

    deleteFile():void{
        this.hiveService.deleteFile(this.fileObj,
            this.fileName).then((result)=>{
            this.content = JSON.stringify(result);
            }).catch((err)=>{
                 alert(err);
            });
    }

    fileList():void{
        this.hiveService.fileList(this.fileObj).then((result)=>{
            this.content = JSON.stringify(result);
            }).catch((err)=>{
                 alert(err);
            });
    }

    ionViewDidLeave(){
        let client = this.hiveService.getClientObj();
        if(client!=null){
            client.disConnect((info:string)=>{

            },(err)=>{
                alert(err);
            });
        }
        this.fileObj = null;
    }
  }
