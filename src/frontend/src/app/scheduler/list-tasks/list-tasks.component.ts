import { Component, OnInit } from '@angular/core';
import { SchedulesService, AlertService } from '../../services/index';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {
  public tasksData = [];
  public selectedTaskType = 'Latest'; // Default is LATEST

  constructor(private schedulesService: SchedulesService, private alertService: AlertService) {}

  ngOnInit() {
    this.getLatestTasks();
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

  /**
   *  cancel running task
   * @param id task id
   */
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
}
