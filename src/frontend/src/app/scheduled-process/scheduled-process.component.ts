import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/index';

enum ScheduleType {
    STARTUP = 1,
    TIMED = 2,
    INTERVAL = 3,
    MANUAL = 4,
  }

enum TaskState {
     RUNNING = 1,
     COMPLETE = 2,
     CANCELED = 3,
     INTERRUPTED = 4
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
  public taskState = TaskState
  constructor( private statisticsService: StatisticsService) { }

  ngOnInit() {
    console.log(this.scheduleType)
    console.log(this.taskState)
    this.getSchedules();
    this.getSchedulesProcesses();
    this.getLatestTasks();
  }

  public getSchedules():void {
    this.schedulesData = [];
    this.statisticsService.getSchedules().
      subscribe(
      data => {
        this.schedulesData = data.schedules;
        console.log("This is the getSchedules ",  data.schedules);
      },
      error => { console.log("error", error) });
  }

  public getSchedulesProcesses():void {
    this.schedulesProcessData = [];
    this.statisticsService.getScheduledProcesses().
      subscribe(
      data => {
        this.schedulesProcessData = data.processes;
        console.log("This is the getSchedulesProcesses ",  this.schedulesProcessData);
      },
      error => { console.log("error", error) });
  }

  public getLatestTasks():void {
    this.tasksData = [];
    this.statisticsService.getLatestTasks().
      subscribe(
      data => {
        this.tasksData = data.tasks;
        console.log("This is the tasks ",  data.tasks);
      },
      error => { console.log("error", error) });
  }
}
