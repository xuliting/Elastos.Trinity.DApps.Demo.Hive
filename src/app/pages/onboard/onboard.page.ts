import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {

  constructor(
    private storage: StorageService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    appManager.setVisible("show");
  }

  ionViewDidEnter() {
  }

  exit() {
    this.storage.setVisit(true);
    this.router.navigate(['picturelist']);
  }
}
