import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  public isActive = true;
  public step:string = '';
  constructor(private router: Router) { }

  ngOnInit() {
    console.log("STEPs", this.step,  " isActive:", this.isActive );
    if(this.isActive){

    }
  }   

  onToggle(step, isActive){
    console.log("STEPs", step,  " isActive:", isActive );
    this.step = step;
    this.isActive = isActive;
    this.router.navigate(['/' + step]);
  }
}
