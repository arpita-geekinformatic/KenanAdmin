import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { FormService, USERSOPTION } from 'src/app/shared/services/form.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-addgifts',
  templateUrl: './addgifts.component.html',
  styleUrls: ['./addgifts.component.scss']
})
export class AddgiftsComponent implements OnInit {
  public userItems: USERSOPTION | any;

  updateid!: string;
  role!: string;
  closeResult = '';
  message = '';
  errorMessage = '';
  adminDetails = {};
  error: { name: string; message: string } = { name: '', message: '' };
  hasError: boolean = false;
  public adminRegisterForm!: FormGroup;
  public adminUpdateForm!: FormGroup;
  get form() {
    return this.adminRegisterForm.controls;
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
    this.navServices.items.subscribe(userItems => {
      this.userItems = userItems;
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      // this.role= params['role']?params['role']:null
      this.updateid = id ? id : null;
      this.adminRegisterForm = this.formBuilder.group(
        this.updateid == null
          ? {
            name: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],


            icon: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],



          }
          : {
            name: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],

            icon: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],
          }
      );

      if (id) {
        this.updateUser(id);
      }
    });
    this.titleService.setTitle(`JOA | Registration`);

  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  //  update user data
  UpdateUserdata() {

    const data = {
      name: this.form.name.value,
      // lastName: this.form.lastName.value,
      status: this.form.status.value,
      email: this.form.email.value,
      id: this.updateid,
    };
    this.apiService.putData('parents', data).subscribe(
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
        this.router.navigateByUrl('/users');
      }
    );
  }

  addUser() {
    this.hasError = false;
    const data = {
      name: this.form.name.value,
      // lastName: this.form.lastName.value,
      status: this.form.status.value,
      email: this.form.email.value,
      password: this.form.password.value,
      // role:this.form.userType.value,
    };
    this.apiService.postData('users/add', data).subscribe(
      (result: any) => {
        if (result.responseCode === 200) {
          // Handle result
          this.toastr.success('Successfully registered.', 'Success!');
        }
      },
      (error) => {
        this.hasError = true;
        this.toastr.error(error.error.responseMessage, 'Error!');
        console.log('error inside');
      },
      () => {

        this.router.navigateByUrl('/users');
      }
    );

  }
  validateForm(email: string, password: string) {
    if (email.length === 0) {
      this.errorMessage = 'please enter email id';
      return false;
    }
    if (password.length === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }
    if (password.length < 6) {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }
    this.errorMessage = '';
    return true;
  }

  //  get user data 
  updateUser(id: any) {
    this.apiService.getData(`parents/${id}`).subscribe(
      (result: any) => {

        this.adminRegisterForm.patchValue({
          name: result.data.name,
          // lastName: result[0].lastName,
          status: result.data.isActive ? 'active' : 'inactive',
          email: result.data.email,
        });

        this.adminDetails = { ...result };
        if (result.responseCode === 200) {
          // Handle result

        }
      },
      (error) => {
        console.log('error inside', error);
      }
    );
  }

  //  change user status
  onChange(event: any) {
    this.adminRegisterForm['controls']['status'].setValue(event.target.value)
  }
}
