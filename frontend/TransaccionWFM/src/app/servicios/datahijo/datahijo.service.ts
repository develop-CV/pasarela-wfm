import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatahijoService {
  private emitChangeSource = new Subject<object>();
  changeEmitted = this.emitChangeSource.asObservable();

  dataHijo(data:object){
    this.emitChangeSource.next(data);
  }

}
