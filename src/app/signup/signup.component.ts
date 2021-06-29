import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm:FormGroup
  constructor(private sessionService:SessionService,private toastr:ToastrService,private router:Router) { 

    this.myForm = new FormGroup({
        firstName:new FormControl(""),
        email:new FormControl(""),
        password : new FormControl(""),
        roleId : new FormControl(1)
    })

  }

  ngOnInit(): void {
  }

  signup(){
    console.log(this.myForm.value);
    this.sessionService.saveUser(this.myForm.value).subscribe(resp=>{
        if(resp.status == 200){
          //success 
          this.toastr.success(resp.msg,"",{timeOut:3000})
          this.router.navigateByUrl("/login")
        }else {
          //error 
          this.toastr.error(resp.msg,"",{timeOut:3000})
        }
    })
  }
}
