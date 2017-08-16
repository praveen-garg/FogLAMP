import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../services/index';

@Component({
  selector: 'app-scheduled-process',
  templateUrl: './scheduled-process.component.html',
  styleUrls: ['./scheduled-process.component.css']
})
export class ScheduledProcessComponent implements OnInit {
  public schedulesData = [];
  public schedulesProcessData = [];
  public tasksData = [];

  constructor(private schedulesService: SchedulesService) { }

  ngOnInit() {
    this.getSchedules();
    this.getSchedulesProcesses();
    this.getLatestTasks();
  }

  public getSchedules():void {
    this.schedulesData = [];
    this.schedulesService.getSchedule().
      subscribe(
      data => {
        this.schedulesData = data.schedules;
        console.log("This is the getSchedules ",  data.schedules);
      },
      error => { console.log("error", error) });
  }

  public getSchedulesProcesses():void {
    this.schedulesProcessData = [];
    this.schedulesService.getScheduledProcess().
      subscribe(
      data => {
        this.schedulesProcessData = data.processes;
        console.log("This is the getSchedulesProcesses ",  this.schedulesProcessData);
      },
      error => { console.log("error", error) });
  }

  public getLatestTasks():void {
    this.tasksData = [];
    this.schedulesService.getLatestTask().
      subscribe(
      data => {
        this.tasksData = data.tasks;
        console.log("This is the tasks ",  data.tasks);
      },
      error => { console.log("error", error) });
  }
}
