import { Component, OnInit, Input } from '@angular/core';
import { ConfigurationService, AlertService } from '../services/index';

@Component({
  selector: 'app-configuration-manager',
  templateUrl: './configuration-manager.component.html',
  styleUrls: ['./configuration-manager.component.css']
})
export class ConfigurationManagerComponent implements OnInit {
  public categoryData = [];
  public configurationData = [];
  constructor(private configService: ConfigurationService, private alertService: AlertService) { }

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
          this.getCategory(element.key, element.description);
        });

      },
      error => { console.log("error", error) });
  }

  private getCategory(category_name: string, cat_desc:string): void {
    var categoryValues = [];
    this.configService.getCategory(category_name).
      subscribe(
      data => {
        categoryValues.push(data);
        this.categoryData.push({ key: category_name, value: categoryValues, description:cat_desc })
        console.log("This is the categoryData ", this.categoryData);
      },
      error => { console.log("error", error) });
  }


  // /**
  //  * 
  //  * @param category_name 
  //  * @param config_item 
  //  */
  // private deleteConfigItem(category_name, config_item) {
  //   console.log("category_name: ", category_name, " Config name: ", config_item);
  //   this.configService.deleteConfigItem(category_name, config_item).
  //     subscribe(
  //     data => {
  //       console.log("data ", data)
  //       if (data.value == "") {
  //         // Hot fix to bind DOM element with latest updated values
  //         location.reload();
  //       }
  //     },
  //     error => { console.log("error", error) });
  // }

  public restoreConfigFieldValue(config_item_key: string, flag: boolean) {
    var inputField = <HTMLInputElement>document.getElementById(config_item_key);
    inputField.value = inputField.textContent; 
    var cancelButton = <HTMLButtonElement>document.getElementById("btn-cancel-" + config_item_key);
    cancelButton.disabled = !flag;
  }

  public saveConfigValue(category_name: string, config_item: string, flag: boolean) {
    var inputField = <HTMLInputElement>document.getElementById(config_item);
    var value = inputField.value;
    var id = inputField.id;
    var cancelButton = <HTMLButtonElement>document.getElementById("btn-cancel-" + id);
    cancelButton.disabled = flag;
    this.configService.editConfigItem(category_name, config_item, value).
      subscribe(
      data => {
          console.log("updated record: ", data)
          this.alertService.success("Value updated successfully");
          inputField.textContent = inputField.value = data.value;
        
      },
      error => { 
        console.log("error", error)
        this.alertService.error(error)
     });
  }

  public onTextChange(config_item_key: string, flag: boolean){
     var cancelButton = <HTMLButtonElement>document.getElementById("btn-cancel-" + config_item_key);
     cancelButton.disabled = !flag;
  }
}
