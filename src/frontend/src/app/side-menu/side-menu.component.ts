import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  public isActive = true;
  public step: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      if (this.router.url === '/' || this.router.url === '/dashboard') {
        console.log(this.router.url);
        this.isActive = true;
        this.step = '/dashboard';
      } else {
        console.log(this.router.url);
        this.isActive = false;
        this.step = this.router.url;
      }
    })
  }

  onToggle(step, isActive) {
    this.step = step;
    this.isActive = isActive;
    this.router.navigate([step]);
  }
}
