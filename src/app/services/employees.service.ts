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

  getUser(deliveryId: number){
    const url = `${environment.apiUrl}/deliveries/${deliveryId}`;
    return this.http.get(url);
  }

  deleteDelivery(deliveryId: number) {
    const url = `${environment.apiUrl}/deliveries/${deliveryId}`;
    return this.http.delete(url);
  }

  updateUser(user: any) {
    const url = `${environment.apiUrl}/deliveries/${user.id}`;
    return this.http.put(url, user);
  }
}