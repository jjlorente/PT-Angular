import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class DeliveryService {
  private deliveriesStore: BehaviorSubject<any> = new BehaviorSubject(null);
  readonly $deliveries: Observable<any> = this.deliveriesStore.asObservable();

  constructor(private http: HttpClient) { }

  getDeliveries(){
    return this.http.get(environment.apiUrl+'/deliveries')
      .subscribe(async (deliveriesPromise)=>{
        let deliveries = await deliveriesPromise;
        this.deliveriesStore.next(deliveries);
      })
  }

  deleteDelivery(deliveryId: number) {
    console.log(deliveryId)
    const url = `${environment.apiUrl}/deliveries/${deliveryId}`;
    console.log(url)
    return this.http.delete(url);
  }
}