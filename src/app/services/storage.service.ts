import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  public setVisit(value: boolean) {
    return this.storage.set("visited", JSON.stringify(value)).then((data) => {
      console.log('Set first visit', data);
    });
  }

  public getVisit(): Promise<boolean> {
    return this.storage.get("visited").then((data) => {
      console.log('Already visited', data);
      return JSON.parse(data);
    });
  }
}
