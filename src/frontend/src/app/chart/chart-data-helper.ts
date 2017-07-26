import {Injectable} from "@angular/core";

@Injectable()
export class ChartDataHelper {
 type:string;
 data:any;
 options:any;
 
 type1:string;
 data1:any;
 options1:any;

 constructor() {
     this.securityAwarenessGraph();
     this.demoGraph();
    }
 securityAwarenessGraph():void {
    this.type= 'line',
    this.data= {
        labels: ["Purge", "Buffered", "Sent", "Read"],
        datasets: [
            {
              label: 'Latest',
              data: [0, 25, 15,45],
              backgroundColor: "rgb(176,196,222)"
            }
        ]
    };
    this.options= {
      scales: {
        yAxes: [{
          ticks: {
                    beginAtZero:true
                }
          }]
        }
      }
    }

    demoGraph():void {
    this.type1 = 'bar',
    this.data1= {
        labels: ["Purge", "Buffered", "Sent", "Read"],
        datasets: [
            {
              label: 'Latest',
              data: [12, 19, 3, 17],
              backgroundColor: "rgb(100,149,237)"
            },
            {
              label: 'Previous',
              data: [3, 4, 5, 6],
              backgroundColor: "rgb(0,0,128)"
            }
        ]
    };
    this.options1= {
      scales: {
        yAxes: [{
          ticks: {
                    beginAtZero:true
                }
          }]
        }
      }
    }
}