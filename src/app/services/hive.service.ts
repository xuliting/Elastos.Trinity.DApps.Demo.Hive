import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HiveService {

  public firstVisit = false;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  init() {
    this.getVisit();
  }

  getVisit() {
    this.storageService.getVisit().then(data => {
        if (data || data === true) {
            this.firstVisit = false;
            console.log('First visit?', this.firstVisit);
        } else {
            this.router.navigate(['onboard']);
        }
    });
  }

  deleteStorage() {
    this.storageService.setVisit(false);
  }
}
