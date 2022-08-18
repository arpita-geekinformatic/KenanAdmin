
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
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  public userItems: USERSOPTION | any;

  updateid!: string;
  role!:string;
  userId:any;
  closeResult = '';
  message = '';
  errorMessage = '';
  adminDetails = {};
  error: { name: string; message: string } = { name: '', message: '' };
  hasError: boolean = false;
  public companyRegisterForm!: FormGroup;

  get form() {
    return this.companyRegisterForm.controls;
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
     this.userId=this.apiService.getUserDetails()._id;
    this.navServices.items.subscribe(userItems => {
      this.userItems = userItems;
    })
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.updateid = id ? id : null;
      this.companyRegisterForm = this.formBuilder.group(
        this.updateid == null
          ? {
            companyName: [
                //this.defaultAuth.email,
                '',
                Validators.compose([Validators.required]),
              ],
              companyType: [
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
              ]
              
              
            }
          : {
            companyName: [
                //this.defaultAuth.email,
                '',
                Validators.compose([Validators.required]),
              ],
              companyType: [
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

      if(id)
      {  
      this.updateCompany(id);
      }
    });
    this.titleService.setTitle(`JOA | Registration`);
  
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }
  //update Admin data
  UpdateCompanydata() {
    const data = {
      companyName: this.form.companyName.value,
      companyType:this.form.companyType.value,
      email: this.form.email.value,
      id: this.updateid,
    };
    this.apiService.putData('company/patchCompany', data).subscribe(
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
  addCompany() {
    this.hasError = false;
    const data = {
      companyName: this.form. companyName.value,
      companyType: this.form.companyType.value,
      email: this.form.email.value,
      userId: this.userId
     };
     this.apiService.postData('company/addCompany', data).subscribe(
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

        this.router.navigateByUrl('/company');
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
  updateCompany(id: any) {
    this.apiService.getData(`company/getCompanyData/${id}`).subscribe(
      (result: any) => {
        this.companyRegisterForm.patchValue({
          companyName: result.data[0].companyName,
          companyType: result.data[0].companyType,
          email: result.data[0].email,
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




















