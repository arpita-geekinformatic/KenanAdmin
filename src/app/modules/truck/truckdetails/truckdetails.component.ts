import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-truckdetails',
  templateUrl: './truckdetails.component.html',
  styleUrls: ['./truckdetails.component.scss']
})
export class TruckdetailsComponent implements OnInit {
  public truckRegister!: FormGroup;
  hasError: boolean | undefined;
  router: any;
  get form() {
    return this.truckRegister.controls;
  }
    constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,) {
  }
  addtruck() {
    const data = {
      CompanyName: this.form.CompanyName.value,
      dlNumber: this.form.dlNumber.value,
      truckNo: this.form.truckNo.value,
      truckType: this.form.truckType.value,
    };
    this.apiService.postData('vehicles/addVehicle', data).subscribe(
      (result: any) => {
        if (result.responseCode === 200) {
          // Handle result
          this.toastr.success('Successfully registered.', 'Success!');
        }
      },
      (error) => {
        this.hasError = true;
        this.toastr.error(error.error.responseMessage, 'Error!');
      },

    );
    this.truckRegister.reset(['']);
  }
  ngOnInit(): void {
    this.truckRegister = this.formBuilder.group(
      {
        CompanyName: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        truckNo: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        dlNumber: [
          //this.defaultAuth.email,
          '',
          Validators.compose([
            Validators.required,

            // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        truckType: [
          //this.defaultAuth.email,
          '',
          Validators.compose([
            Validators.required
            // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
      }
    );
  }

}
