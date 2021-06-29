import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {

  myForm: FormGroup
  constructor(private igService:IngredientService,private toastr:ToastrService,private router:Router) {

    this.myForm = new FormGroup({

      active: new FormControl(true),
      description: new FormControl(""),
      effects: new FormControl(""),
      name: new FormControl(""),
      notConsumeBy: new FormControl(""),
      source: new FormControl("")

    })
  }

  ngOnInit(): void {

  }

  saveIngredient(){
    console.log(this.myForm.value)
    this.igService.saveIngredient(this.myForm.value).subscribe(resp=>{
        if(resp.status == 200){
            this.toastr.success(resp.msg,"",{timeOut:3000})
        }else if(resp.status == -1){

          this.toastr.error(resp.msg,"",{timeOut:3000})
          this.router.navigateByUrl("/login")
        }
    })
  }
}
