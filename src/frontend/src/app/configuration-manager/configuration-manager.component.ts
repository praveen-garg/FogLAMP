import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../services/index';

@Component({
  selector: 'app-configuration-manager',
  templateUrl: './configuration-manager.component.html',
  styleUrls: ['./configuration-manager.component.css']
})
export class ConfigurationManagerComponent implements OnInit {
  private categoryData = [];
  private congfigurationData = [];
  constructor(private configService: ConfigurationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories(): void {
    this.congfigurationData = [];
    this.configService.getCategories().
      subscribe(
      data => {
        this.congfigurationData = data.categories;
        console.log("This is the congfigurationData ", this.congfigurationData);
        this.congfigurationData.forEach(element => {
          this.getCategory(element.key);
        });
        
      },
      error => { console.log("error", error) });
  }

  public getCategory(category_name:string): void {
    var categoryValues = [];
    this.configService.getCategory(category_name).
        subscribe(
        data => {
          categoryValues.push(data);
          this.categoryData.push({key : category_name,value: categoryValues})
          console.log("This is the categoryData ", this.categoryData);
        },
        error => { console.log("error", error) });
  }
}
