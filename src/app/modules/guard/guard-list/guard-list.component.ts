/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guard-list',
  templateUrl: './guard-list.component.html',
  styleUrls: ['./guard-list.component.scss']
})
export class GuardListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
 */


import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-guard-list',
  templateUrl: './guard-list.component.html',
  styleUrls: ['./guard-list.component.scss']
})
export class GuardListComponent implements OnInit {
  adminsLists:any=false;
  page: number = 1;
  count: number = 1;
  tableSize: number=5
  pageSize:number = 5
  totalItems:any=5
  tableSizes: any = [3, 6, 9, 12]
  selectedAdminsData:any = '';
  
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}
    
  ngOnInit(): void {

    this.adminData(1);
  }


	onSelected(value:string): void {
		this.selectedAdminsData= value;
    this.pageSize = parseInt(value);
    this.tableSize= parseInt(value);
    this.adminData(1);
	}


  adminData(event) {
     this.page=event;
     let skip  = this.pageSize *(event -1)
      this.apiService.getData(`guard/getguarddata?skip=${skip}&limit=${this.pageSize}`).subscribe(
      (result: any) => {
        this.adminsLists = result.item;
        this.count=result.totals 
        },
      (error) => {
        console.log('error inside');
      }
    );
  }
  //delete Admin Data
  deleteAdmin(id: any) {
    this.apiService.deleteData(`admins/deleteAdmin/${id}`).subscribe(
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
        this.adminData(event);
      }
    );
  }
  //editAdmin data
  editAdmin(id: any,Role:any ) {
     this.router.navigate(
      ['guard/edit'],
      { queryParams: {'id':id, 'role': Role } }
    );

     
  }
}
