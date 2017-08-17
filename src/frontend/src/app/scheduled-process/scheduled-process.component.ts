import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../services/index';

enum ScheduleType {
  STARTUP = 1,
  TIMED = 2,
  INTERVAL = 3,
  MANUAL = 4,
}

@Component({
  selector: 'app-scheduled-process',
  templateUrl: './scheduled-process.component.html',
  styleUrls: ['./scheduled-process.component.css']
})
export class ScheduledProcessComponent implements OnInit {
  public schedulesData = [];
  public schedulesProcessData = [];
  public tasksData = [];
  public scheduleType = ScheduleType;

  nameField
  repeatInputField
  timeField
  scheduleTypeKeys(): Array<string> {
    var keys = Object.keys(this.scheduleType);
    return keys.slice(keys.length / 2);
  }
  constructor(private schedulesService: SchedulesService) {
    this.nameField = <HTMLInputElement>document.getElementById("name");
    this.repeatInputField = <HTMLInputElement>document.getElementById("repeat");
    this.timeField = <HTMLInputElement>document.getElementById("time");
  }

  ngOnInit() {
    this.getSchedules();
    this.getSchedulesProcesses();
    this.getLatestTasks();
  }

  public getSchedules(): void {
    this.schedulesData = [];
    this.schedulesService.getSchedule().
      subscribe(
      data => {
        this.schedulesData = data.schedules;
        console.log("This is the getSchedules ", data.schedules);
      },
      error => { console.log("error", error) });
  }

  public getSchedulesProcesses(): void {
    this.schedulesProcessData = [];
    this.schedulesService.getScheduledProcess().
      subscribe(
      data => {
        this.schedulesProcessData = data.processes;
        console.log("This is the getSchedulesProcesses ", this.schedulesProcessData);
      },
      error => { console.log("error", error) });
  }

  public getLatestTasks(): void {
    this.tasksData = [];
    this.schedulesService.getLatestTask().
      subscribe(
      data => {
        this.tasksData = data.tasks;
        console.log("This is the tasks ", data.tasks);
      },
      error => { console.log("error", error) });
  }

  public setType(value): void {
    // console.log("value type:" + value);
    // if (value == 1) {
    //   //this.repeatInputField.disabled()
    //   //this.timeField.disabled = true;
    // }
  }

  createSchedule() {
    //var nameField = <HTMLInputElement>document.getElementById("name");

    //var repeatInputField = <HTMLInputElement>document.getElementById("repeat");
    var repeatValue = this.repeatInputField.value;
    var total_repete_interval_seconds = this.converTime(repeatValue)
    console.log(total_repete_interval_seconds);

    //var timeField = <HTMLInputElement>document.getElementById("time");
    var timeValue = this.timeField.value;
    var seconds = this.converTime(timeValue)
    console.log(seconds);
  }

  converTime(timeValue) {
    var repeatTime = timeValue.split(':');
    var seconds = (+repeatTime[0]) * 60 * 60 + (+repeatTime[1]) * 60 + (+repeatTime[2]);
    return seconds;
  }
}
