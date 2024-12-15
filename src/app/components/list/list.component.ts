import { Component, Input, OnInit } from '@angular/core';
import { DynamicFormModalComponent } from '../dynamic-form-modal/dynamic-form-modal.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})


export class ListComponent {
 
  @Input() headers: { label: string; key: string; type: 'text' | 'image' }[] = [];
  @Input() tableData: any[] = [];
  

}
