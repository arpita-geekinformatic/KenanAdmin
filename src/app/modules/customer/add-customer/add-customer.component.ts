import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { FormService, USERSOPTION } from 'src/app/shared/services/form.service';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  public userItems: USERSOPTION | any;

  updateid!: string;
  role!: string;
  userId: any;
  closeResult = '';
  message = '';
  errorMessage = '';
  adminDetails = {};
  error: { name: string; message: string } = { name: '', message: '' };
  hasError: boolean = false;
  public customerRegisterForm!: FormGroup;

  get form() {
    return this.customerRegisterForm.controls;
  }

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService,
    private titleService: Title,
    private navServices: FormService,


  ) {
    this.userId = this.apiService.getUserDetails()._id;
    this.navServices.items.subscribe(userItems => {
      this.userItems = userItems;
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.updateid = id ? id : null;
      this.customerRegisterForm = this.formBuilder.group(
        this.updateid == null

          ? {
            customerName: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],
            customerAddress: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],
            phoneNo: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required, Validators.pattern("[0-9 ]{10}")]),
            ],
            email: [
              //this.defaultAuth.email,
              '',
              Validators.compose([
                Validators.required,
                Validators.email,
                Validators.minLength(3),
                Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
              ]),
            ]


          }
          : {
            customerName: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],
            customerAddress: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],
            phoneNo: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],
            email: [
              //this.defaultAuth.email,
              '',
              Validators.compose([
                Validators.required,
                Validators.email,
                Validators.minLength(3),
                Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
              ]),
            ],

          }
      );

      if (id) {
        this.updateCustomer(id);
      }
    });
    this.titleService.setTitle(`JOA | Registration`);
  }
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }
  //update Admin data
  UpdateCustomerdata() {
    const data = {
      Name: this.form.customerName.value,
      Address: this.form.customerAddress.value,
      Email: this.form.email.value,
      Phone: this.form.phoneNo.value,
      id: this.updateid,
    };
    this.apiService.putData('customer/patch', data).subscribe(
      (result: any) => {
        if (result?.responseCode === 200) {
          // Handle result

        }
      },
      (error) => {
        this.hasError = true;
        this.toastr.error(error.error.responseMessage, 'Error!');
        console.log('error inside');
      },
      () => {
        this.toastr.success('Successfully updated.', 'Success!');
        this.router.navigateByUrl('/company');
      }
    );
  }
  addCustomer() {
    this.hasError = false;
    const data = {
      Name: this.form.customerName.value,
      Address: this.form.customerAddress.value,
      Email: this.form.email.value,
      Phone: this.form.phoneNo.value,
      userId: this.userId
    };
    this.apiService.postData('customer/add', data).subscribe(
      (result: any) => {
        if (result.responseCode === 200) {
          // Handle result
          this.toastr.success('Successfully registered.', 'Success!');
        }
      },
      (error) => {
        this.hasError = true;
        this.toastr.error(error.error.responseMessage, 'Error!');
        console.log('error inside', error);
      },
      () => {

        this.router.navigateByUrl('/customer');
      }
    );

  }

  updateCustomer(id: any) {
    this.apiService.getData(`customer/data/${id}`).subscribe(
      (result: any) => {

        this.customerRegisterForm.patchValue({
          customerName: result[0].Name,
          customerAddress: result[0].Address,
          email: result[0].Email,
          phoneNo: result[0].Phone,
        });

        if (result.responseCode === 200) {
          // Handle result

        }
      },
      (error) => {
        //this.hasError=true;
        //this.toastr.error(error.error.responseMessage,"Error!");
        console.log('error inside', error);
      }
    );
  }
}




















