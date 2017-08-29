import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../services/index';

@Component({
  selector: 'app-scheduled-process',
  templateUrl: './scheduled-process.component.html',
  styleUrls: ['./scheduled-process.component.css']
})
export class ScheduledProcessComponent implements OnInit {
  public scheduleData = []
  public scheduleProcess = []
  public scheduleType = []
  public tasksData = []

  public invalidRepeat: boolean = false
  public invalidTime: boolean = false

  public selectedType: Number = 1;

  constructor(private schedulesService: SchedulesService) { }

  ngOnInit() {
    this.getScheduleType()
    this.getSchedules()
    this.getSchedulesProcesses()
    this.getLatestTasks()
  }

  public getScheduleType(): void {
    this.schedulesService.getScheduleType().
      subscribe(
      data => {
        this.scheduleType = data.schedule_type
        console.log(this.scheduleType)
      },
      error => { console.log("error", error) })
  }

  public getSchedules(): void {
    this.scheduleData = [];
    this.schedulesService.getSchedule().
      subscribe(
      data => {
        this.scheduleData = data.schedules
        console.log("This is the getSchedule ", data.schedules)
      },
      error => { console.log("error", error) });
  }

  public getSchedulesProcesses(): void {
    this.scheduleProcess = [];
    this.schedulesService.getScheduledProcess().
      subscribe(
      data => {
        this.scheduleProcess = data.processes
        console.log("This is the getScheduleProcess ", this.scheduleProcess)
      },
      error => { console.log("error", error) });
  }

  public getLatestTasks(): void {
    this.tasksData = [];
    this.schedulesService.getLatestTask().
      subscribe(
      data => {
        this.tasksData = data.tasks;
        console.log("Tasks data", data.tasks)
      },
      error => { console.log("error", error) })
  }

  public setType(value){
      this.selectedType = value;
  }

  public createSchedule() {
    let schedule_name = <HTMLInputElement>document.getElementById("name")
    let schedule_process = <HTMLSelectElement>document.getElementById("process")
    let schedule_type = <HTMLSelectElement>document.getElementById("type")
    let repeat_interval = <HTMLInputElement>document.getElementById("repeat")
    let exclusive_state = <HTMLInputElement>document.getElementById("exclusive")
    
    if(this.selectedType == 2) {
        var scheduler_day_field = <HTMLSelectElement>document.getElementById("day")
        var scheduler_time_field = <HTMLInputElement>document.getElementById("time")
        var day = scheduler_day_field.value
        var time = scheduler_time_field.value
        var scheduled_time = time != '' ? this.converTime(time):0
    }
    var repete_time = repeat_interval.value != '' ? this.converTime(repeat_interval.value):0
    this.invalidRepeat = this.between(repete_time) 
    this.invalidTime =  this.between(scheduled_time)
    if (this.invalidRepeat || this.invalidTime) {
      return;
    }

    var payload = {
      "name": schedule_name.value,
      "process_name": schedule_process.value,
      "type": schedule_type.value,
      "repeat": repete_time,
      "day": day,
      "time": scheduled_time,
      "exclusive": exclusive_state.checked
    }
    this.schedulesService.createSchedule(payload).
      subscribe(
      data => {
        this.getSchedules()
      },
      error => { console.log("error", error) })
  }

  public between(x) {
    // To check if Time in 00:00:01, 23:59:59 range
    return x == 0 || x >= 86400
  }

  // Convert time in seconds 
  converTime(timeValue) {
    var repeatTime = timeValue.split(':')
    var seconds = (+repeatTime[0]) * 60 * 60 + (+repeatTime[1]) * 60 + (+repeatTime[2])
    return seconds;
  }
}
