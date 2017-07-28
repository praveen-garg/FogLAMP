import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../services/index';

@Component({
  selector: 'app-configuration-manager',
  templateUrl: './configuration-manager.component.html',
  styleUrls: ['./configuration-manager.component.css']
})
export class ConfigurationManagerComponent implements OnInit {
  congfigurationData = [];
  categoryValues = [];
  constructor(private configService: ConfigurationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories(): void {
    this.configService.getCategories().
      subscribe(
      data => {
        this.congfigurationData = data.categories;
        console.log("This is the congfigurationData ", this.congfigurationData);
        this.getCategory();
      },
      error => { console.log("error", error) });
  }

  public getCategory(): void {
    this.congfigurationData.forEach(element => {
      this.configService.getCategory(element.key).
        subscribe(
        data => {
          this.categoryValues.push(data);
          console.log("This is the categoryData ", this.categoryValues);
        },
        error => { console.log("error", error) });
    });
  }
}
