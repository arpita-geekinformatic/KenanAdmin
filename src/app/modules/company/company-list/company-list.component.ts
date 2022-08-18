

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companyLists:any=false;
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
    this.companyData(1);
  }


	onSelected(value:string): void {
		this.selectedAdminsData= value;
    this.pageSize = parseInt(value);
    this.tableSize= parseInt(value);
    this.companyData(1);
	}


  companyData(event) {
     this.page=event;
     let skip  = this.pageSize *(event -1)
      this.apiService.getData(`company/getCompanydata?skip=${skip}&limit=${this.pageSize}`).subscribe(
      (result: any) => {
        this.companyLists = result.data;

        this.count=result.totals 
        },
      (error) => {
        console.log('error inside');
      }
    );
  }
  //delete Admin Data
  deleteCompany(id: any) {
    this.apiService.deleteData(`company/deleteCompany/${id}`).subscribe(
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
        this.companyData(event);
      }
    );
  }
  //editAdmin data
  editCompany(id: any) {
    this.router.navigate(
      ['company/update'],
      { queryParams: {'id':id} }
    );
  }
 
  }








