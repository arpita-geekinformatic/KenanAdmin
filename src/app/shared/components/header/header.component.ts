import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { NavService } from '../../services/nav.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  Body = document.querySelector('body')


  layoutSubscription: Subscription;
  userDisplayName: string = "";
  userType: string = "";
  hasError: boolean = false;
  constructor(
    public layoutService: LayoutService,
    public navServices: NavService,

    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) {
    this.layoutSubscription = layoutService.changeEmitted.subscribe(
      direction => {
        const dir = direction.direction;
      })
  }

  ngOnInit(): void {
    var kenenUserObject: any = localStorage.getItem("userDetails");
    kenenUserObject = JSON.parse(kenenUserObject);

    // this.userType = kenenUserObject?.role;
    this.userDisplayName = kenenUserObject?.name;
  }

  /* searchOpen(){
    this.Body?.classList.add('search-show')
  }
  
  search(e:any){
    e.preventDefault();
    
    this.Body?.classList.remove('search-show')
  }

 
   */
  sidebarToggle() {
    let App = document.querySelector('.app')
    if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.add('sidenav-toggled');
    }
    else {
      App?.classList.remove('sidenav-toggled');
    }
  }

  logout() {

    this.apiService.postData("adminLogout", {}).subscribe(
      (result: any) => {
        if (result.responseCode === 200) {
          // Handle result
          this.router.navigate(["/auth/login"]);
          localStorage.removeItem("authorization");
          localStorage.removeItem('userDetails');
        }
      },
      (error) => {
        // Handle error
        this.hasError = true;
        this.toastr.error(error.error.responseMessage, "Error!");
        console.log("error inside");
      },
      () => {
        this.router.navigate(["/auth/login"]);
        this.toastr.success('Logged out.', 'Success');
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );


    //this.auth.logout();
    //document.location.reload();

  }
}
