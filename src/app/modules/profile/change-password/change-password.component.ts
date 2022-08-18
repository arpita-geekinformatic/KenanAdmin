import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { MustMatch } from '../../../shared/validations/passwordValidator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hasError: boolean = false;
  public changePasswordForm! : FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService,
    ){ }

  get form(){
    return this.changePasswordForm.controls;
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: [
        //this.defaultAuth.email,
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]),
      ],     
     
      password: [
        //this.defaultAuth.password,
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      cPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ]      
    },
    {
      validator: MustMatch('password','cPassword')
    }
    );
  }

  changePassword() {
    this.hasError = false;
    const data = {
      currentPassword:this.form.currentPassword.value,      
      password: this.form.password.value,
      token:this.apiService.jwt
      };
    this.apiService.postData("auth/resetPassword", data).subscribe(
      (result: any) => {   
        if(result.responseCode===200){
          // Handle result
          } 
      },
      (error) => {
        // Handle error
        this.hasError = true;      
        this.toastr.error(error.error.responseMessage, "Error!");
      
      },
      () => {
        this.toastr.success("Password changed successfully.", "Success!");
        this.router.navigate(['/dashboard']);    
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }
}
