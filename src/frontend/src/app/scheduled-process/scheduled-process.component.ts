import { Component, OnInit, ViewChild } from '@angular/core';
import { SchedulesService, AlertService } from '../services/index';
import { ModalComponent } from '../modal/modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import Utils from '../utils';

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
  public scheduleData = [];
  public scheduleProcess = [];
  public scheduleType = [];
  public tasksData = [];
  public days = [];

  public selectedTaskType = 'Latest'; // Default is LATEST
  public scheduler_name: string;

  // Object to hold schedule id to delete
  public childData: any;
  public updateScheduleData: any;
  @ViewChild(ModalComponent) child: ModalComponent;
  @ViewChild(UpdateModalComponent) updateModal: UpdateModalComponent;

  constructor(private schedulesService: SchedulesService, private alertService: AlertService) { }

  ngOnInit() {
    this.days = Object.keys(weekDays).map(key => weekDays[key]).filter(value => typeof value == 'string') as string[];
    this.getSchedules();
    this.getLatestTasks();

    this.updateScheduleData = {
      schedule_process: this.scheduleProcess,
      schedule_type: this.scheduleType,
      day: this.days
    };
  }

  public getSchedules(): void {
    this.scheduleData = [];
    this.schedulesService.getSchedules().
      subscribe(
      data => {
        if (data.error) {
          this.alertService.error(data.error.message);
          return;
        }
        this.scheduleData = data.schedules;
        this.scheduleData.forEach(element => {
          const repeatTimeObj = Utils.secondsToDhms(element.repeat);
          if (repeatTimeObj.days == 1) {
            element.repeat = repeatTimeObj.days + ' day, ' + repeatTimeObj.time;
          } else if (repeatTimeObj.days > 1) {
            element.repeat = repeatTimeObj.days + ' days, ' + repeatTimeObj.time;
          } else {
            element.repeat = repeatTimeObj.time;
          }
          // Time
          element.time = Utils.secondsToDhms(element.time).time;
        });
        console.log('This is the getSchedule ', data.schedules);
      },
      error => { console.log('error', error); });
  }

  /**
   * Get ScheduleProcess from create-schedule.component.ts
   * @param data:  ScheduleProcess record transmitted from
   * child component create-schedule.component.ts
   */
  public setScheduleProcess(data) {
    this.scheduleProcess = data;
  }

  /**
   * Get ScheduleType from create-schedule.component.ts
   * @param data:  ScheduleType record transmitted from
   * child component create-schedule.component.ts
   */
  public setScheduleType(data) {
    this.scheduleType = data;
  }

  /**
   * Get tasks by state {RUNNING, LATEST}
   * @param state Task state
   */
  public getTasks(state) {
    if (state.toUpperCase() == 'RUNNING') {
      this.selectedTaskType = 'Running';
      this.getRunningTasks();
      return;
    }
    this.selectedTaskType = 'Latest';
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
        if (data.error) {
          this.alertService.error(data.error.message);
          return;
        }
        this.tasksData = data.tasks;
        console.log('Latest tasks ', data.tasks);
      },
      error => { console.log('error', error); });
  }

  /**
   * Get running tasks
   */
  public getRunningTasks(): void {
    this.tasksData = [];
    this.schedulesService.getTasks('RUNNING').
      subscribe(
      data => {
        if (data.error) {
          this.alertService.error(data.error);
        }
        this.tasksData = data.tasks;
        console.log('Running tasks ', this.tasksData);
      },
      error => { console.log('error', error); });
  }

  public cancelRunninTask(id) {
    console.log('Task UUID:', id);
    this.schedulesService.cancelTask(id).
      subscribe(
      data => {
        if (data.error) {
          this.alertService.error(data.error.message);
        }
        if (data.message) {
          this.alertService.success(data.message + ' Wait for 5 seconds!');
          // TODO: remove cancelled task object from local list
          setTimeout(() => {
            console.log('waiting...', this.selectedTaskType);
            if (this.selectedTaskType == 'Running') {
              this.getRunningTasks();
            } else {
              this.getLatestTasks();
            }
          }, 5000);
        }
      },
      error => { console.log('error', error); });
  }

  /**
   * toggle update modal and pass recod info to update
   * @param id Record id for update
   */
  public editSchedule(id) {
    this.updateScheduleData = {
      id: id,
      schedule_process: this.scheduleProcess,
      schedule_type: this.scheduleType,
      day: this.days
    };
    this.updateModal.toggleModal(true);
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
    this.child.toggleModal(true);
    this.childData = {
      id: id
    };
  }
}
