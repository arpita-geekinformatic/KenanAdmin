import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { FormService, USERSOPTION } from 'src/app/shared/services/form.service';
import { filter } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
@Component({
  selector: 'app-addgifts',
  templateUrl: './addgifts.component.html',
  styleUrls: ['./addgifts.component.scss']
})
export class AddgiftsComponent implements OnInit {
  public userItems: USERSOPTION | any;
  imageSrc!: string
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
  giftId = "";
  base64Output!: string;

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
      this.giftId = id
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
      icon: (this.form.icon.value) ? this.form.icon.value : this.imageSrc,
      
    };
    this.apiService.postData(`updateGiftType/${this.giftId}`, data).subscribe(
      (result: any) => {
        if (result?.responseCode === 200) {
          

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
      icon: this.form.icon.value
    };
    this.apiService.postData('addGiftType', data).subscribe(
      (result: any) => {
        if (result.responseCode === 200) {
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

  }

  //  get user data 
  updateUser(id: any) {
    this.apiService.getData(`viewGiftType/${id}`).subscribe(
      (result: any) => {

        this.imageSrc = result.data.icon
        this.adminRegisterForm.get('name')?.setValue(result.data.name)
        this.adminRegisterForm.get('icon')?.setValue(result.data.icon)

        debugger

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

  onFileUpload(fileInput) {
    var files = fileInput.target.files;
    var file = files[0];
    this.convertFile(file).subscribe(base64 => {
      this.base64Output = base64;
      if (this.base64Output) {
        this.apiService.uploadImage('upload', { data: this.base64Output }).subscribe(
          (result: any) => {
            if (result.responseCode === 200) {
              this.adminRegisterForm.get('icon')?.setValue(result.data.url)
            }
          },
          (error) => {
            this.hasError = true;
            this.toastr.error(error.error.responseMessage, 'Error!');
            console.log('error inside');
          },

        );
      }
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  //  change user status
  onChange(event: any) {
    this.adminRegisterForm['controls']['status'].setValue(event.target.value)
  }
}
