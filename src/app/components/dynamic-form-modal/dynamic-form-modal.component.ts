import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploader } from 'ng2-file-upload';
import { FORM_TYPE } from '../../shared/constants';
import { SharedService } from '../../shared/shared.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';


@Component({
  selector: 'app-dynamic-form-modal',
  standalone: true,
  templateUrl: './dynamic-form-modal.component.html',
  imports: [ReactiveFormsModule, FormsModule, NgForOf, NgSwitch, NgSwitchCase, NgIf, NgxSelectModule],
  styleUrl: './dynamic-form-modal.component.scss'
})
export class DynamicFormModalComponent implements OnInit {
  title?: string;
  formConfig: any[] = []
  form!: FormGroup;
  type: string;
  filteredOptionsOriginal: any;
  filteredOptions: any // Clone the original initially
  fileUploader: FileUploader;
  public uploader: FileUploader = new FileUploader({ url: URL });
  hasBaseDropZoneOver: any;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {

    this.fileUploader = new FileUploader({
      url: 'YOUR_BACKEND_ENDPOINT',
      allowedFileType: ['image', 'pdf', 'doc'],
      autoUpload: false,
    });

  }

  ngOnInit(): void {

    if (this.type === FORM_TYPE.CUSTOMER) {
      const findListToBeFilter = this.formConfig.find(config => config?.isFilterNeeded)
      this.filteredOptionsOriginal = findListToBeFilter?.options;
      this.filteredOptions = [...this.filteredOptionsOriginal];
    }
    this.initializeForm();
  }

  doSelectOptions(options: any, field: any) {
    const value = options[0]?.value;
    if (field === "region") {
      this.filteredOptions = this.filteredOptionsOriginal.filter(
        (item) => item.region === value
      );
    }
  }

  initializeForm() {
    const group: any = {};
    this.formConfig.forEach((field) => {
      if (field.type === 'multi-select' || field.type === 'select') {
        group[field.name] = [field.defaultValue || [], field?.required ? Validators.required : []];
      } else if (field.type === 'radio-group') {
        group[field.name] = [field.defaultValue || '', field?.required ? Validators.required : []];
      } else if (field.type === 'file-upload') {
        group[field.name] = [[]];
      } else {
        group[field.name] = [field.defaultValue || '', field?.required ? Validators.required : []];
      }
    });
    this.form = this.fb.group(group);    
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  triggerFileSelect(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);

      if (this.type === FORM_TYPE.PIN) {
        const urlPath = "https://via.placeholder.com/100";
        const pinData = { ...this.form.value, document: urlPath}
        this.sharedService.pinData$.next(pinData)
      } else {
        this.sharedService.customerData$.next(this.form.value)

      }
      this.bsModalRef.hide()
    } else {
      this.validateAllFormFields(this.form)
      console.log('Form Invalid');
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


}
