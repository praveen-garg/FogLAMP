import { Component, OnInit } from '@angular/core';
import { SchedulesService, AlertService } from '../services/index';
import Utils from '../utils';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  // To handle field validtion on UI
  public invalidRepeat: Boolean = false;
  public invalidTime: Boolean = false;

  // Default selected schedule type is STARTUP = 1
  public selected_schedule_type: Number = 1;

  constructor(private schedulesService: SchedulesService, private alertService: AlertService) { }

  ngOnInit() {}

  public createSchedule() {
    const schedule_name_fld = <HTMLInputElement>document.getElementById('name');
    const schedule_process_fld = <HTMLSelectElement>document.getElementById('process');
    const schedule_type_fld = <HTMLSelectElement>document.getElementById('type');

    const exclusive_state_fld = <HTMLInputElement>document.getElementById('exclusive');

    const repeat_day_fld = <HTMLInputElement>document.getElementById('rday');
    const repeat_time_fld = <HTMLInputElement>document.getElementById('rtime');

    // check if time is in valid range
    this.invalidRepeat = Utils.not_between(repeat_time_fld.value);
    if (this.invalidRepeat) {
      return;
    }

    const day_fld = <HTMLSelectElement>document.getElementById('day');
    const time_fld = <HTMLInputElement>document.getElementById('time');
    let day = 0;
    let scheduled_time = 0;


    // total time with days and hh:mm:ss
    const total_repeat_time = repeat_time_fld.value !== '' ? Utils.convertTimeToSec(
      repeat_time_fld.value, Number(repeat_day_fld.value)) : undefined;

    /**
     *  "schedule_type": [
     *      {"index": 1, "name": "STARTUP"},
     *      {"index": 2,"name": "TIMED"},
     *      {"index": 3,"name": "INTERVAL"},
     *      {"index": 4,"name": "MANUAL"}]
     *      For schedule type 'TIMED', show 'Day' and 'TIME' field on UI
     */
    if (this.selected_schedule_type === 2) {  // Condition to check if schedule type is TIMED == 2
      day = Number(day_fld.value);
      // check if time is in valid range
      this.invalidTime = Utils.not_between(time_fld.value);
      if (this.invalidTime) {
        return;
      }
      // Time value in seconds for TIMED schedule
      scheduled_time = time_fld.value !== '' ? Utils.convertTimeToSec(time_fld.value) : undefined;
    }

    const payload = {
      'name': schedule_name_fld.value,
      'process_name': schedule_process_fld.value,
      'type': schedule_type_fld.value,
      'repeat': total_repeat_time,
      'day': day,
      'time': scheduled_time,
      'exclusive': exclusive_state_fld.checked
    };
    this.schedulesService.createSchedule(payload).
      subscribe(
      data => {
        if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        // this.getSchedules();

        // Clear form fields
        schedule_name_fld.value = '';
        repeat_day_fld.value = '';
        repeat_time_fld.value = '';
        schedule_process_fld.value = ''; // this.scheduleProcess[0]; // set process dropdown to 0 index value
        schedule_type_fld.value = '1';
        this.setScheduleTypeKey(1); // To set schedule type key globally for required field handling on UI
      },
      error => { console.log('error', error); });
  }

  /**
  *  To set schedule type key globally for required field handling on UI
  * @param value
  */
  public setScheduleTypeKey(value) {
    this.selected_schedule_type = value;
  }
}
