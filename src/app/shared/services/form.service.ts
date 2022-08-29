import { Options } from '@angular-slider/ngx-slider';
import { Injectable, OnDestroy } from '@angular/core';
import { Users } from 'angular-feather/icons';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class USERSOPTION{
    value?: string;
    label?: string;
  }
@Injectable({
  providedIn: 'root'
})
export class  FormService  implements OnDestroy {
constructor() {};
ngOnDestroy(){}
USERS: USERSOPTION[] = [
      {value: 'Admin',label:'Admin'},
      {value: 'Guard',label:'Guard'},
      {value: 'Yard',label:'Yard'}, 
      {value: 'Traffic',label:'Traffic'},
      {value: 'Warehouse',label:'Warehouse'},
     ];

    //array
    items = new BehaviorSubject<USERSOPTION[]>(this.USERS);
}

