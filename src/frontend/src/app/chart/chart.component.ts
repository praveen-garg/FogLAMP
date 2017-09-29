import { Component, Input, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'chart',
  template: '<canvas></canvas>',
  styles: [':host { display: block; }']
})
export class ChartComponent implements OnInit, OnChanges {
  chart: any;

  @Input() type: string;
  @Input() data: any;
  @Input() options: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.chart = new Chart(this.elementRef.nativeElement.querySelector('canvas'), {
      type: this.type,
      data: this.data,
      options: {
        legend: {
          display: false // fixme: not working
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && changes['data']) {
      let currentValue = changes['data'].currentValue;
      ['datasets', 'labels', 'xLabels', 'yLabels'].forEach(property => {
        this.chart.data[property] = currentValue[property];
      });
      this.chart.update();
    }
  }
}
