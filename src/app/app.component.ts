import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryService } from './services/delivery.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})

export class AppComponent {

  constructor(
    private deliveryService: DeliveryService
  ) { }

  title = 'challenge-angular';
  displayedColumns: string[] = ['id', 'name', 'available', 'orders'];
  dataSource = new MatTableDataSource<Delivery>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.deliveryService.getDeliveries();
    this.deliveryService.$deliveries.subscribe((data) => {
      this.dataSource.data = data;
    });
  }
}

export interface Delivery {
  id: number;
  name: string;
  available: boolean;
  orders: Order[];
}

export interface Order {
  id: number;
  customer: string;
  address: string;
  status: string;
}