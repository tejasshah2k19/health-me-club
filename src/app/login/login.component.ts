import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private sessionService:SessionService,private toastr:ToastrService,private router:Router) { 

    this.loginForm = new FormGroup({
      email : new FormControl(""),
      password : new FormControl("")
    })
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.value);
      this.sessionService.authenticate(this.loginForm.value).subscribe(resp=>{
        if(resp.status == 200){
          //success
          this.toastr.success(resp.msg,"",{timeOut:3000})
          localStorage.setItem("authToken",resp.data.authToken)
          localStorage.setItem("firstName",resp.data.firstName)
          if(resp.data.roleId == 1){
            //redirect to admin home  page 
          }else if(resp.data.roleId == 2){
            //redirect to user home page
            this.router.navigateByUrl("/user-home")
          }
        }else if(resp.status == -1){
          //error   
          this.toastr.error(resp.msg,"",{timeOut:3000})
        }else{
          this.toastr.error("something went wrong","",{timeOut:3000})
        }
      })    
  }
}
