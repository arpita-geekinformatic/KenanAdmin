import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class  CustomerListComponent implements OnInit {
  customerLists:any=false;
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
    this.customerData(1);
  }


	onSelected(value:string): void {
		this.selectedAdminsData= value;
    this.pageSize = parseInt(value);
    this.tableSize= parseInt(value);
    this.customerData(1);
	}


 customerData(event) {
     this.page=event;
     let skip  = this.pageSize *(event -1)
      this.apiService.getData(`customer/data?skip=${skip}&limit=${this.pageSize}`).subscribe(
      (result: any) => {
        this.customerLists = result.item;

        this.count=result.totals 
        },
      (error) => {
        console.log('error inside');
      }
    );
  }
  //delete Admin Data
  deleteCustomer(id: any) {
    this.apiService.deleteData(`customer/delete/${id}`).subscribe(
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
        this.customerData(event);
      }
    );
  }
  //editAdmin data
  editCustomer(id: any) {
    this.router.navigate(
      ['customer/update'],
      { queryParams: {'id':id} }
    );
  }
 
  }








