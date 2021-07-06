import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.css']
})
export class ListIngredientComponent implements OnInit {

  ingredients: Array<any> = []
  constructor(private igService: IngredientService) { }

  ngOnInit(): void {

    this.getAllIngredeints()
  }

  getAllIngredeints() {
    this.igService.getAllIngredients().subscribe(resp => {

      if (resp.statu == -1) {
        //login
      } else {
        this.ingredients = resp.data;
      }
    },err=>{
      alert("something went wrong");
     })
  }

}
