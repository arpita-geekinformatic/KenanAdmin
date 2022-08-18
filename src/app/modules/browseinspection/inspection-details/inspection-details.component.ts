import { Component, OnInit, VERSION } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.scss']
})
export class InspectionDetailsComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  public Details: any = {};
  userid:any
  constructor(private apiService: ApiService,
               private router: Router,
               private route: ActivatedRoute,
                private toastr: ToastrService,) {
      
      this.route.params.subscribe((params) => {

        this.userid = params['id'];
  
        if (this.userid) {
          return this.getUserdetails()
        }
  
      })
     }

  ngOnInit(): void {
   }
 
  convertMoment(date){
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }
  

 
  getUserdetails(){
    this.apiService.getData(`inspection/getinspection/${this.userid}`).subscribe(
      (result: any) => {
        this.Details = result;

      },
      (error) => {
        this.toastr.success('server Error', 'Error');
      },
    )
  }
  printPage() {
    window.print();
  }
  handleMissingImage(event:any,imgName:any){
    this.Details[imgName]='../../../../assets/images/users/no_image.jpeg'
  }


}
