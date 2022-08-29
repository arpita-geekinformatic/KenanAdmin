/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-guard',
  templateUrl: './update-guard.component.html',
  styleUrls: ['./update-guard.component.scss']
})
export class UpdateGuardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { FormService, USERSOPTION } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-update-guard',
  templateUrl: './update-guard.component.html',
  styleUrls: ['./update-guard.component.scss']
})
export class UpdateGuardComponent implements OnInit {
  public userItems: USERSOPTION | any;

  updateid!: string;
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
    private navServices: FormService
  ) {
    this.navServices.items.subscribe(userItems => {
      this.userItems = userItems;
    })
  }
  



  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.updateid = id ? id : null;
      if(id)
      {
      this.updateAdmin(id);
      }
    });
    this.titleService.setTitle(`JOA | Registration`);
    this.adminRegisterForm = this.formBuilder.group(
      this.updateid == null
        ? {
            firstName: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],
            lastName: [
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
            password: [
              //this.defaultAuth.password,
              '',
              Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(100),
              ]),
            ],
            userType: [
              //this.defaultAuth.email,
              '',
              Validators.compose([
                Validators.required
              ]),
            ],
          
            
          }
        : {
            firstName: [
              //this.defaultAuth.email,
              '',
              Validators.compose([Validators.required]),
            ],
            lastName: [
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
            userType: [
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

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }
  //update Admin data
  UpdateAdmindata() {
    const data = {
      firstName: this.form.firstName.value,
      lastName: this.form.lastName.value,
      email: this.form.email.value,
      id: this.updateid,
    };
    this.apiService.putData('admins/patchAdmin', data).subscribe(
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
        this.router.navigateByUrl('/admins');
      }
    );
  }
  addAdmin() {
    this.hasError = false;
    const data = {
      firstName: this.form.firstName.value,
      lastName: this.form.lastName.value,
      email: this.form.email.value,
      password: this.form.password.value,
      role:this.form.userType.value,
    };
     this.apiService.postData('admins/addAdmin', data).subscribe(
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

        this.router.navigateByUrl('/admins');
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
  updateAdmin(id: any) {
    this.apiService.getData(`admins/getAdminData/${id}`).subscribe(
      (result: any) => {
        this.adminRegisterForm.patchValue({
          firstName: result[0].firstName,
          lastName: result[0].lastName,
          email: result[0].email,
        });
        this.adminDetails = { ...result };
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
