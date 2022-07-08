import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from './../../../shared/services/global';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from './../../../shared/services/common.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DBOperation } from 'src/app/shared/services/db-operation';
import {
  CharFieldValidator,
  NoWhiteSpaceValidator,
} from 'src/app/validations/validations.validator';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit, OnDestroy {
  objRows: any[] = [];
  objRow: any;

  addForm: FormGroup;
  btnText: string;
  dbops: DBOperation;

  @ViewChild('nav') elnav: any;
  formErrors = {
    name: '',
    code:''
  };
  validationMessage = {
    name: {
      required: ' Name is required',
      minlength: 'Name can not be less than 1 char long',
      maxlength: 'name can not be more than 10 char long',
      noWhiteSpaceValidator: 'Only Whitespace is not allowed',
      validCharField: 'name must be contains  Char and space only',
    },
    code: {
      required: ' Code is required',
      minlength: 'Code can not be less than 1 char long',
      maxlength: 'Code can not be more than 10 char long',
      noWhiteSpaceValidator: 'Only Whitespace is not allowed'
    },
  };

  constructor(
    private _commonService: CommonService,
    private _toastr: ToastrService,
    private _fb: FormBuilder
  ) {}
  setFormState() {
    this.btnText = 'Submit';
    this.dbops = DBOperation.create;

    this.addForm = this._fb.group({
      id: [0],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          NoWhiteSpaceValidator.noWhiteSpaceValidator,
          CharFieldValidator.validCharField,
        ]),
      ],
      code: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          NoWhiteSpaceValidator.noWhiteSpaceValidator
        ]),
      ],
    });

    this.addForm.valueChanges.subscribe(() => {
      this.onValueChanged();
    });
  }

  onValueChanged() {
    if (!this.addForm) {
      return;
    }
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = this.addForm.get(field);
      if (control && control.dirty && control.invalid) {
        const message = this.validationMessage[field];

        for (const key of Object.keys(control.errors)) {

          if(key !=='required'){
            this.formErrors[field] += message[key] + "  ";
          }

        }
      }
    }
  }
  ngOnInit(): void {
    this.getData();
    this.setFormState();
  }
  get f() {
    return this.addForm.controls;
  }
  getData() {
    this._commonService
      .get(Global.BASE_API_PATH + 'ColorMaster/GetAll')
      .subscribe((res) => {
        if (res.isSuccess) {
          debugger;
          this.objRows = res.data;
        } else {
          this._toastr.error(res.errors[0], 'ColorMaster');
        }
      });
  }

  resetForm() {
    this.addForm.reset({
      id: 0,
      name: '',
      code: ''
    });

    this.btnText = 'Submit';
    this.dbops = DBOperation.create;
    this.elnav.select('viewtab');
    this.getData();
  }

  cancelForm() {
    this.addForm.reset({
      id: 0,
      name: '',
      code: ''
    });

    this.btnText = 'Submit';
    this.dbops = DBOperation.create;
    this.elnav.select('viewtab');
  }
  Edit(_id: number) {
    this.btnText = 'Update';
    this.dbops = DBOperation.update;
    this.elnav.select('addtab');

    this.objRow = this.objRows.find((s) => s.id === _id);

    //  this.addForm.controls['id'].setValue(this.objRow.id)
    //  this.addForm.controls['name'].setValue(this.objRow.name)

    // this.addForm.get('id').setValue(this.objRow.id)
    //  this.addForm.get('name').setValue(this.objRow.name)
    debugger;
    this.addForm.patchValue(this.objRow);
  }
  tabChange(event: any) {
    this.addForm.reset({
      id: 0,
      name: '',
    });

    this.btnText = 'Submit';
    this.dbops = DBOperation.create;
  }

  Delete(_id: number) {
    let obj = {
      id: _id,
    };

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this._commonService
          .post(Global.BASE_API_PATH + 'ColorMaster/Delete/', obj)
          .subscribe((res) => {
            if (res.isSuccess) {
              this.getData();
              Swal.fire(
                'Deleted!',
                'Your record file has been deleted.',
                'success'
              );
            } else {
              this._toastr.error(res.errors[0], 'ColorMaster');
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your record is safe :)', 'error');
      }
    });
  }
  Submit() {
    switch (this.dbops) {
      case DBOperation.create:
        this._commonService
          .post(Global.BASE_API_PATH + 'ColorMaster/Save/', this.addForm.value)
          .subscribe((res) => {
            if (res.isSuccess) {
              this._toastr.success(
                'record has been saved successfull !!',
                'ColorMaster'
              );
              this.resetForm();
            } else {
              this._toastr.error(res.errors[0], 'ColorMaster');
            }
          });
        break;
      case DBOperation.update:
        this._commonService
          .post(Global.BASE_API_PATH + 'ColorMaster/Update/', this.addForm.value)
          .subscribe((res) => {
            if (res.isSuccess) {
              this._toastr.success(
                'record has been Updated successfully !!',
                'ColorMaster'
              );
              this.resetForm();
            } else {
              this._toastr.error(res.errors[0], 'ColorMaster');
            }
          });
        break;
    }
  }
  ngOnDestroy() {
    this.objRows = null;
    this.objRow = null;
  }
  onSort(event: any) {
    console.log(event);
  }

  onPage(event: any) {
    console.log(event);
  }
}

