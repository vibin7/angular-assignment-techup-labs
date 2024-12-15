import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../shared/local-storage.service';
import { listOfCustomers, listOfPins } from '../shared/data';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    // loading the data stored data.ts
    this.localStorageService.setItem("pins", listOfPins)
    this.localStorageService.setItem("customer", listOfCustomers)
  }
}
