import { Component, OnInit } from '@angular/core';
import { DynamicFormModalComponent } from '../../components/dynamic-form-modal/dynamic-form-modal.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NgForOf } from '@angular/common';
import { ApiConnectService } from '../../shared/api-connect.service';
import { countries, listOfPins } from '../../shared/data';
import { FORM_TYPE, pinHeaders } from '../../shared/constants';
import { LocalStorageService } from '../../shared/local-storage.service';
import { SharedService } from '../../shared/shared.service';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-pins-list',
  standalone: true,
  imports: [NgForOf, ListComponent],
  templateUrl: './pins-list.component.html',
  styleUrl: './pins-list.component.scss'
})
export class PinsListComponent implements OnInit {
  bsModalRef?: BsModalRef;
  customerFormConfig: any;
  pinFormConfig: any;
  tableData: any[];
  // Dropdown items
  regions: any[] = [];
  countries: { country: string; region: string }[] = [];
  filteredCountries: { country: string; region: string }[] = [];
  data = countries.data;

  headers = pinHeaders;
  constructor(
    private modalService: BsModalService,
    private apiConnectService: ApiConnectService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    // this.apiConnectService.get('countries').subscribe({
    //   next: (data) => console.log('GET response:', data),
    //   error: (error) => console.error('GET error:', error),
    // });
    this.initializeDropdownData();
    this.tableData = this.localStorageService.getItem("pins");

    this.sharedService.pinData$.subscribe(data => {
      console.log("data", data);
      if (data) {
        this.tableData.push(data)
        this.localStorageService.setItem("pins", this.tableData)
      }

    })

  }

  initializeDropdownData(): void {
    this.regions = Array.from(
      new Set(Object.values(this.data).map((item) => item.region))
    );
    // Extract countries as an array
    this.countries = Object.values(this.data).map(data => data);

    // Defining form elements
    this.customerFormConfig = [
      { type: 'input', required: true, inputType: 'text', name: 'name', label: 'Name' },
      { type: 'input', required: true, inputType: 'email', name: 'email', label: 'Email' },
      {
        type: 'select',
        required: true,
        name: 'region',
        label: 'Region',
        id: "id",
        text: "text",
        options: this.regions
      },
      {
        type: 'select',
        required: true,
        name: 'country',
        label: 'Country',
        id: "country",
        text: "country",
        isFilterNeeded: true,
        options: this.countries
      },
    ];

    this.pinFormConfig = [
      { type: 'input', required: true, inputType: 'text', name: 'title', label: 'Title' },
      {
        type: 'multi-select',
        required: true,
        name: 'collaborators',
        label: 'Collaborators',
        options: ['John', 'Alice', 'Sara', 'Paul'], // For ngx-select-ex
      },
      {
        type: 'radio-group',
        name: 'privacy',
        label: 'Privacy Setting',
        options: [
          { value: 'public', label: 'Public' },
          { value: 'private', label: 'Private' },
        ],
        required: true,
      },
      {
        type: 'file-upload',
        name: 'document',
        label: 'Upload Document',
        required: true,
      },
    ];
  }

  addCustomer() {
    const title = "Add customer";
    this.openModalWithComponent(this.customerFormConfig, FORM_TYPE.CUSTOMER, title);
  }

  addPin() {
    const title = "Add Pin";
    this.openModalWithComponent(this.pinFormConfig, FORM_TYPE.PIN, title);
  }

  openModalWithComponent(formConfig: any, type: string, title: string) {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Open a modal with component', 'Pass your data', 'Do something else', '...'],
        title: title,
        formConfig: formConfig,
        type: type
      }
    };
    this.bsModalRef = this.modalService.show(DynamicFormModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
