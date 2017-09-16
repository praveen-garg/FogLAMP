import { Component, OnInit, ViewChild } from '@angular/core';
import { SchedulesService, AlertService } from '../services/index';

import { ModalComponent } from '../modal/modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

import Utils from '../utils'

enum weekDays {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7
}


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
  public days = [];

  // To handle field validtion on UI
  public invalidRepeat: boolean = false
  public invalidTime: boolean = false
  public selectedTaskType = 'Latest' // Default is LATEST  

  // Default selected schedule type is STARTUP = 1
  public selected_schedule_type: Number = 1;

  // Object to hold schedule id to delete 
  public childData: any;
  public updateScheduleData: any;

  @ViewChild(ModalComponent) child: ModalComponent;
  @ViewChild(UpdateModalComponent) updateModal: UpdateModalComponent;
  constructor(private schedulesService: SchedulesService, private alertService: AlertService) { }

  ngOnInit() {
    this.days = Object.keys(weekDays).map(key => weekDays[key]).filter(value => typeof value === 'string') as string[];
    this.getScheduleType()
    this.getSchedules()
    this.getSchedulesProcesses()
    this.getLatestTasks()

    this.updateScheduleData = {
      schedule_process: this.scheduleProcess,
      schedule_type: this.scheduleType,
      day: this.days
    }
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
    this.schedulesService.getSchedules().
      subscribe(
      data => {
        this.scheduleData = data.schedules
        this.scheduleData.forEach(element => {
          let repeatTimeObj = Utils.secondsToDhms(element.repeat);
          if (repeatTimeObj.days == 1) {
            element.repeat = repeatTimeObj.days + " day, " + repeatTimeObj.time
          } else if (repeatTimeObj.days > 1) {
            element.repeat = repeatTimeObj.days + " days, " + repeatTimeObj.time
          } else {
            element.repeat = repeatTimeObj.time;
          }

          // Time 
          element.time = Utils.secondsToDhms(element.time).time;
        });
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

  /**
   * Get tasks by state {RUNNING, LATEST}
   * @param state Task state
   */
  public getTasks(state) {
    if (state.toUpperCase() == 'RUNNING') {
      this.selectedTaskType = "Running" 
      this.getRunningTasks();
      return;
    }
    this.selectedTaskType = "Latest" 
    this.getLatestTasks();
  }

  /**
   * Get latest tasks
   */
  public getLatestTasks(): void {
    this.tasksData = [];
    this.schedulesService.getLatestTask().
      subscribe(
      data => {
        this.tasksData = data.tasks;
        console.log("Latest tasks ", data.tasks)
      },
      error => { console.log("error", error) })
  }

  /**
   * Get running tasks
   */
  public getRunningTasks(): void {
    this.tasksData = [];
    this.schedulesService.getTasks("RUNNING").
      subscribe(
      data => {
        if (data.error) {
          this.alertService.error(data.error)
        }
        this.tasksData = data.tasks;
        console.log("Running tasks ", this.tasksData)
      },
      error => { console.log("error", error) })
  }

  public cancelRunninTask(id) {
    console.log("Task UUID:", id);
    this.schedulesService.cancelTask(id).
      subscribe(
      data => {
        if (data.error) {
          this.alertService.error(data.error)
        }
        if (data.message) {   
          this.alertService.success(data.message + " Wait for 5 seconds!")
          // TODO: remove cancelled task object from local list
          setTimeout(()=>{ 
            console.log("waiting...", this.selectedTaskType)
            if (this.selectedTaskType == 'Running'){
              this.getRunningTasks()
            }
            else {
              this.getLatestTasks()
            }
          }, 5000);   
        }
      },
      error => { console.log("error", error) })
  }



  /**
   *  To set schedule type key globally for required field handling on UI
   * @param value  
   */
  public setScheduleTypeKey(value) {
    this.selected_schedule_type = value;
  }

  public createSchedule() {
    let schedule_name_fld = <HTMLInputElement>document.getElementById("name")
    let schedule_process_fld = <HTMLSelectElement>document.getElementById("process")
    let schedule_type_fld = <HTMLSelectElement>document.getElementById("type")

    let exclusive_state_fld = <HTMLInputElement>document.getElementById("exclusive")

    let repeat_day_fld = <HTMLInputElement>document.getElementById("rday")
    let repeat_time_fld = <HTMLInputElement>document.getElementById("rtime")

    // check if time is in valid range
    this.invalidRepeat = Utils.not_between(repeat_time_fld.value)
    if (this.invalidRepeat) {
      return;
    }

    let day_fld = <HTMLSelectElement>document.getElementById("day")

    let time_fld = <HTMLInputElement>document.getElementById("time")
    let day = 0;
    let scheduled_time = 0;


    // total time with days and hh:mm:ss
    let total_repeat_time = repeat_time_fld.value != '' ? Utils.convertTimeToSec(repeat_time_fld.value, Number(repeat_day_fld.value)) : undefined

    /**
     *  "schedule_type": [
     *      {"index": 1, "name": "STARTUP"},
     *      {"index": 2,"name": "TIMED"},
     *      {"index": 3,"name": "INTERVAL"},
     *      {"index": 4,"name": "MANUAL"}]
     *      For schedule type 'TIMED', show 'Day' and 'TIME' field on UI
     */
    if (this.selected_schedule_type == 2) {  // Condition to check if schedule type is TIMED == 2
      day = Number(day_fld.value)
      // check if time is in valid range
      this.invalidTime = Utils.not_between(time_fld.value)
      if (this.invalidTime) {
        return;
      }
      // Time value in seconds for TIMED schedule
      scheduled_time = time_fld.value != '' ? Utils.convertTimeToSec(time_fld.value) : undefined
    }

    let payload = {
      "name": schedule_name_fld.value,
      "process_name": schedule_process_fld.value,
      "type": schedule_type_fld.value,
      "repeat": total_repeat_time,
      "day": day,
      "time": scheduled_time,
      "exclusive": exclusive_state_fld.checked
    }
    this.schedulesService.createSchedule(payload).
      subscribe(
      data => {
        this.getSchedules();

        // Clear form fields 
        schedule_name_fld.value = ''
        repeat_day_fld.value = ''
        repeat_time_fld.value = ''
        schedule_process_fld.value = this.scheduleProcess[0]; // set process dropdown to 0 index value
        schedule_type_fld.value = '1';
        this.setScheduleTypeKey(1) // To set schedule type key globally for required field handling on UI
        time_fld != undefined ? time_fld.value = '' : 0
      },
      error => { console.log("error", error) })
  }

  /**
   * toggle update modal and pass recod info to update
   * @param id Record id for update
   */
  private editSchedule(id) {
    this.updateScheduleData = {
      id: id,
      schedule_process: this.scheduleProcess,
      schedule_type: this.scheduleType,
      day: this.days
    }
    this.updateModal.toggleModal(true)
  }

  /**
   * To reload schedule list after deletion of a schedule
   * @param notify  
   */
  onNotify() {
    this.getSchedules();
  }

  /**
   * Open delete record modal dialog
   * @param id  schedule id to delete
   */
  openModal(id) {
    // call child component method to toggle modal
    this.child.toggleModal(true)
    this.childData = {
      id: id
    }
  }
}