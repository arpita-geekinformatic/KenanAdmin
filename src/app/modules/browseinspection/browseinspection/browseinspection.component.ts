import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-browseinspection',
  templateUrl: './browseinspection.component.html',
  styleUrls: ['./browseinspection.component.scss']
})
export class BrowseinspectionComponent implements OnInit {
  page: number = 1;
  count: number = 1;
  tableSize: number=5
  pageSize:number = 5
  totalItems:any=5
  tableSizes: any = [3, 6, 9, 12]



  
  constructor(private apiService: ApiService,  private router: Router,
  private toastr: ToastrService,) { }
  public Details: any;
  ngOnInit(): void {
    this.browseData(1);
  }

  browseData(event){
    this.page = event;
    let skip = this.pageSize *(event -1)
    this.apiService.getData(`inspection/getinspection?skip=${skip}&limit=${this.pageSize}`).subscribe(
      (result: any) => {
        this.Details = result.item;
        this.count=result.count 
          
      },

    )
  }
  editBrowseInspecion(id: any) {
    this.router.navigateByUrl(`/browseinspection/edit/${id}`);
  }

	onSelected(value:string): void {
    this.pageSize = parseInt(value);
    this.tableSize= parseInt(value);
    this.browseData(1);
	}
  handleMissingImage(event:any,t:any,k:any){
      this.Details[k][t]='../../../../assets/images/users/no_image.jpeg'
    }

  convertMoment(date){
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  detailsBrowseInspecion(id:any){
    this.router.navigateByUrl(`/browseinspection/details/${id}`);
  }  

}











