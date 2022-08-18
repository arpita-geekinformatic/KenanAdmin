import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-traffic-list',
  templateUrl: './traffic-list.component.html',
  styleUrls: ['./traffic-list.component.scss']
})
export class TrafficListComponent implements OnInit {
  public trailerRegisterForm!: FormGroup;
  updateid: any
  submitted: boolean = false
  disableTemp: boolean = false
  selectedTrailerType = "";
  loaded = false
  countArr: any
  BaseUrl = "http://ec2-18-222-141-47.us-east-2.compute.amazonaws.com:3000"
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService, private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,) {
    this.countArr = Array.from(Array(76).keys())
    this.countArr.shift()
    this.route.params.subscribe((params) => {

      this.updateid = params['id'];

      if (this.updateid) {
        return this.getUserId()
      }

    });

  }
  get form() {
    return this.trailerRegisterForm.controls;
  }
  ngOnInit(): void {
    this.trailerRegisterForm = this.formBuilder.group(
      {
        DATE: [
          '',
          Validators.compose([Validators.required]),
        ],
        INCOMINGFROM: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        OUTGOINGTO: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        CUSTOMER: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        MERCHANDISE_DESCRIPTION: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        INVOICE_NUMBER: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],

        MOVEMENT_TYPE: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        TRAILER_NUBMER: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        TRAILER_TYPE: [
          '',
          Validators.compose([Validators.required]),
        ],
        TRAILER_COMPANY: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],

        TRAILER_STATUS: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        CTPAT: [
          '',
          Validators.compose([Validators.required]),
        ],
        TRAILER_CLEAN: [
          'No',
          Validators.compose([Validators.required]),
        ],

        TRAILER_CONDITIONS: [
          '',
          Validators.compose([Validators.required]),
        ],
        SEAL_COMMENTS: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],

        ORIGINAL_SEAL: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        ADDITIONAL_SEAL: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        DIESEL_DATE: [
          '',
          Validators.compose([Validators.required]),
        ],

        DIESEL_AMOUNT: [
          '',
          Validators.compose([Validators.required]),
        ],
        SEAL_BROKEN: [
          '',
          Validators.compose([Validators.required]),
        ],

        DIESEL_LEVEL_ARRIVING: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        ACTUAL_TEMP: [
          //this.defaultAuth.email,
          '',
          //Validators.compose([Validators.required]),
        ],

        SET_TEMP: [
          //this.defaultAuth.email,
          '',
          //Validators.compose([Validators.required]),
        ],


        TRUCK_NUMBER: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],


        TRUCK_COMPANY: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        DRIVER_NAME: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        DRIVER_LICENSE: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],
        TRAILER_LOCATION: [
          //this.defaultAuth.email,
          '',
          Validators.compose([Validators.required]),
        ],

        DRIVER_PICTURE: [
          '',
          Validators.compose([Validators.required]),
        ],
        LICENSE_PICTURE: [
          '',
        Validators.compose([Validators.required]),
        ],
        SEAL_PICTURE: [
          '',
          Validators.compose([Validators.required]),
        ],
        TEMPERATURE_PICTURE: [
          '',
          Validators.compose([Validators.required]),
        ],

        Front_Trailer: [
          '',
          Validators.compose([Validators.required]),
        ],

        Roof: [
          '',
          Validators.compose([Validators.required]),
        ],

        Undercarriage: [
          '',
          Validators.compose([Validators.required]),
        ],

        DOOR_PICTURE: [
          '',
          Validators.compose([Validators.required]),
        ],
        LEFT_SIDE_PICTURE: [
          '',
        Validators.compose([Validators.required]),
        ],

        RIGHT_SIDE_PICTURE: [
          '',
          Validators.compose([Validators.required]),
        ],
        FLOOR_PICTURE: [
          '',
          Validators.compose([Validators.required]),
        ],
      })
  }
  addTrailer() {
    const data = {
      DATE: this.form.DATE.value,
      INCOMINGFROM: this.form.INCOMINGFROM.value,
      OUTGOINGTO: this.form.OUTGOINGTO.value,
      CUSTOMER: this.form.CUSTOMER.value,
      INVOICE_NUMBER: this.form.INVOICE_NUMBER.value,
      MERCHANDISE_DESCRIPTION: this.form.MERCHANDISE_DESCRIPTION.value,
      MOVEMENT_TYPE: this.form.MOVEMENT_TYPE.value,
      TRAILER_NUBMER: this.form.TRAILER_NUBMER.value,
      TRAILER_TYPE: this.form.TRAILER_TYPE.value,
      TRAILER_COMPANY: this.form.TRAILER_COMPANY.value,
      TRAILER_STATUS: this.form.TRAILER_STATUS.value,
      CTPAT: this.form.CTPAT.value,
      TRAILER_CLEAN: this.form.TRAILER_CLEAN.value,
      TRAILER_CONDITIONS: this.form.TRAILER_CONDITIONS.value,
      SEAL_COMMENTS: this.form.SEAL_COMMENTS.value,
      ORIGINAL_SEAL: this.form.ORIGINAL_SEAL.value,
      ADDITIONAL_SEAL: this.form.ADDITIONAL_SEAL.value,
      DIESEL_DATE: this.form.DIESEL_DATE.value,
      DIESEL_AMOUNT: this.form.DIESEL_AMOUNT.value,
      SEAL_BROKEN: this.form.SEAL_BROKEN.value,
      DIESEL_LEVEL_ARRIVING: this.form.DIESEL_LEVEL_ARRIVING.value,
      ACTUAL_TEMP: this.form.ACTUAL_TEMP.value,
      SET_TEMP: this.form.SET_TEMP.value,
      TRUCK_NUMBER: this.form.TRUCK_NUMBER.value,
      TRUCK_COMPANY: this.form.TRUCK_COMPANY.value,
      DRIVER_NAME: this.form.DRIVER_NAME.value,
      DRIVER_LICENSE: this.form.DRIVER_LICENSE.value,
      TRAILER_LOCATION: this.form.TRAILER_LOCATION.value,
      DRIVER_PICTURE: this.form.DRIVER_PICTURE.value,
      LICENSE_PICTURE: this.form.LICENSE_PICTURE.value,
      SEAL_PICTURE: this.form.SEAL_PICTURE.value,
      TEMPERATURE_PICTURE: this.form.TEMPERATURE_PICTURE.value,
      Front_Trailer: this.form.Front_Trailer.value,
      Roof: this.form.Roof.value,
      Undercarriage: this.form.Undercarriage.value,
      DOOR_PICTURE: this.form.DOOR_PICTURE.value,
      LEFT_SIDE_PICTURE: this.form.LEFT_SIDE_PICTURE.value,
      RIGHT_SIDE_PICTURE: this.form.RIGHT_SIDE_PICTURE.value,
      FLOOR_PICTURE: this.form.FLOOR_PICTURE.value,
    };
    this.apiService.postData('inspection/addinspection', data).subscribe(
      (result: any) => {
        if (result.responseCode === 200) {
          // Handle result
          this.toastr.success('Successfully registered.', 'Success!');
          this.router.navigateByUrl('/browseinspection');
        }
      },
      (error) => {

        //this.toastr.error(error.error.responseMessage, 'Error!');
      },

    );
  }

  UpdateTrailer() {
    
    const data = {
      DATE: this.form.DATE.value,
      INCOMINGFROM: this.form.INCOMINGFROM.value,
      OUTGOINGTO: this.form.OUTGOINGTO.value,
      CUSTOMER: this.form.CUSTOMER.value,
      INVOICE_NUMBER: this.form.INVOICE_NUMBER.value,
      MERCHANDISE_DESCRIPTION: this.form.MERCHANDISE_DESCRIPTION.value,
      MOVEMENT_TYPE: this.form.MOVEMENT_TYPE.value,
      TRAILER_NUBMER: this.form.TRAILER_NUBMER.value,
      TRAILER_TYPE: this.form.TRAILER_TYPE.value,
      TRAILER_COMPANY: this.form.TRAILER_COMPANY.value,
      TRAILER_STATUS: this.form.TRAILER_STATUS.value,
      CTPAT: this.form.CTPAT.value,
      TRAILER_CLEAN: this.form.TRAILER_CLEAN.value,
      TRAILER_CONDITIONS: this.form.TRAILER_CONDITIONS.value,
      SEAL_COMMENTS: this.form.SEAL_COMMENTS.value,
      ORIGINAL_SEAL: this.form.ORIGINAL_SEAL.value,
      ADDITIONAL_SEAL: this.form.ADDITIONAL_SEAL.value,
      DIESEL_DATE: this.form.DIESEL_DATE.value,
      DIESEL_AMOUNT: this.form.DIESEL_AMOUNT.value,
      SEAL_BROKEN: this.form.SEAL_BROKEN.value,
      DIESEL_LEVEL_ARRIVING: this.form.DIESEL_LEVEL_ARRIVING.value,
      ACTUAL_TEMP: this.form.ACTUAL_TEMP.value,
      SET_TEMP: this.form.SET_TEMP.value,
      TRUCK_NUMBER: this.form.TRUCK_NUMBER.value,
      TRUCK_COMPANY: this.form.TRUCK_COMPANY.value,
      DRIVER_NAME: this.form.DRIVER_NAME.value,
      DRIVER_LICENSE: this.form.DRIVER_LICENSE.value,
      TRAILER_LOCATION: this.form.TRAILER_LOCATION.value,
      DRIVER_PICTURE: this.form.DRIVER_PICTURE.value,
      LICENSE_PICTURE: this.form.LICENSE_PICTURE.value,
      SEAL_PICTURE: this.form.SEAL_PICTURE.value,
      TEMPERATURE_PICTURE: this.form.TEMPERATURE_PICTURE.value,
      Front_Trailer: this.form.Front_Trailer.value,
      Roof: this.form.Roof.value,
      Undercarriage: this.form.Undercarriage.value,
      DOOR_PICTURE: this.form.DOOR_PICTURE.value,
      LEFT_SIDE_PICTURE: this.form.LEFT_SIDE_PICTURE.value,
      RIGHT_SIDE_PICTURE: this.form.RIGHT_SIDE_PICTURE.value,
      FLOOR_PICTURE: this.form.FLOOR_PICTURE.value,
      id: this.updateid,
    };
    this.apiService.putData('inspection/patchinspection', data).subscribe(
      (result: any) => {
        if (result?.responseCode === 200) {

        }
      },
      (error) => {
        //this.hasError = true;
        this.toastr.error(error.error.responseMessage, 'Error!');
        console.log('error inside');
      },
      () => {
        this.toastr.success('Successfully updated.', 'Success!');
        this.router.navigateByUrl('/browseinspection');
      }
    );
  }



  checkTrailerClean(event) {
 
    if (event == 'No' || this.trailerRegisterForm.invalid) {
      return this.submitted = false
    }
    if (event == 'Yes' || this.trailerRegisterForm.valid) {
      return this.submitted = true
    }
    return
  }
  getUserId() {
    this.apiService.getData(`inspection/getinspection/${this.updateid}`).subscribe(
      (result: any) => {
        let form = this.trailerRegisterForm.controls
        for (let key in form) {
          if (key === 'DATE' || key === 'DIESEL_DATE') {
            result[key] = moment(result[key]).format("YYYY-MM-DD");
          }
          this.trailerRegisterForm['controls'][key].setValue(result[key])
        }
      },
      (error) => {
      },
    )
  }

  checkTemp(event) {
    if (event != 'Reefer') {
      return this.disableTemp = true
    }
    return this.disableTemp = false
  }

  onFileChanged(event, type) {
     this.loaded = false
    const file = event.target.files[0]
    const uploadData = new FormData();

    uploadData.append('myFile', file);
    this.apiService.postDataMultipart('auth/fileUpload', uploadData).subscribe(
      (result: any) => {
        
        if (type === 'TEMPERATURE_PICTURE') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }
        if (type === 'SEAL_PICTURE') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }
        if (type === 'DRIVER_PICTURE') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }if (type === 'LICENSE_PICTURE') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }if (type === 'Front_Trailer') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }if (type === 'Roof') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }if (type === 'Undercarriage') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }
        if (type === 'DOOR_PICTURE') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }
        if (type === 'LEFT_SIDE_PICTURE') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }
        if (type === 'RIGHT_SIDE_PICTURE') {
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }

        if (type === 'FLOOR_PICTURE'){
          this.commonImage(this.trailerRegisterForm['controls'][type], result)
        }

       


      },
      (error) => {
        console.log(error)
      }
    )
  }


  commonImage(event,image) {
    event.setValue(this.BaseUrl + image.fileUrl)
  }
}


