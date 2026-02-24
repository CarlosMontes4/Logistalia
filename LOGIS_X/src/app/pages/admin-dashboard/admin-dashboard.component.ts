import { Component, OnInit } from '@angular/core';
import { Almacen } from '../../model/almacen';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

almacenes: Almacen[] = [];

  constructor(private almacenService: AlmacenService) {}

  ngOnInit(): void {
    this.almacenService.listar().subscribe(data => {
      this.almacenes = data;
    });
  }

}
