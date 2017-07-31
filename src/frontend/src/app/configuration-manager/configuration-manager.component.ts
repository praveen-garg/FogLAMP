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
  private configurationData = [];
  constructor(private configService: ConfigurationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories(): void {
    this.configurationData = [];
    this.configService.getCategories().
      subscribe(
      data => {
        this.configurationData = data.categories;
        console.log("This is the congfigurationData ", this.configurationData);
        this.configurationData.forEach(element => {
          this.getCategory(element.key);
        });
        
      },
      error => { console.log("error", error) });
  }

  private getCategory(category_name:string): void {
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

  private deletConfigItem() {
      
  }
}
