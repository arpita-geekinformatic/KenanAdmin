import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent implements OnInit {
  adminsLists: any = false;
  page: number = 1;
  count: number = 1;
  tableSize: number = 5
  pageSize: number = 5
  totalItems: any = 5
  tableSizes: any = [3, 6, 9, 12]
  selectedAdminsData: any = '';
  isSpinner = false

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userData(1);
  }


  onSelected(value: string): void {
    this.selectedAdminsData = value;
    this.pageSize = parseInt(value);
    this.tableSize = parseInt(value);
    this.userData(1);
  }


  userData(event) {
    this.isSpinner = false
    this.page = event;
    let skip = this.pageSize * (event - 1)
    this.apiService.getData(`giftTypeList?skip=${skip}&limit=${this.pageSize}`).subscribe(
      (result: any) => {

        this.isSpinner = true
        this.adminsLists = result.data;
        this.count = result.data.totalItems;
        this.totalItems = result.data.totalItems;

        },
      (error) => {
        console.log('error inside');
      }
    );
  }

  // delete user Data
  deleteUser(id: any) {
    
    this.apiService.deleteData(`deleteGiftType/${id}`).subscribe(
      (result: any) => {
        if (result?.responseCode === 200) {
          console.log('success');
        }
      },
      (error) => {
        console.log('error inside', error);
      },
      () => {
        this.toastr.success('Successfully Deleted.', 'Success!');
        this.userData(1);
      }
    );
  }

  // edit user data
  editUser(data: any) {    
    this.router.navigate(
      ['/gifts/edit'],
      { queryParams: { 'id':data.giftId } }
    );
  }
}






