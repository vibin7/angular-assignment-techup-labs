import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {

    pinData$ = new BehaviorSubject<any | undefined>(undefined);
    customerData$ = new BehaviorSubject<any | undefined>(undefined);
    
    constructor() { }

}