import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchedulesService, AlertService } from '../services/index';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  // Default selected schedule type is STARTUP = 1
  public selected_schedule_type: Number = 1
  public scheduleProcess = []
  public scheduleType = []
  public days = []

  @Input() childData: { id: Number, schedule_process: any, schedule_type: any, days: any }
  @Output() notify: EventEmitter<any> = new EventEmitter<any>()

  form: FormGroup;
  constructor(private schedulesService: SchedulesService, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      repeat: ['', Validators.required],
      exclusive: ['', Validators.required],
      process_name: ['', Validators.required],
      type: ['', Validators.required],
      day: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.childData)
    if (changes['childData']) {
      this.scheduleProcess = this.childData.schedule_process
      this.scheduleType = this.childData.schedule_type
      this.days = this.childData.days
      this.getSchedule(this.childData.id)
    }
  }

  /**
   *  To set schedule type key globally for required field handling on UI
   * @param value  
   */
  public setScheduleTypeKey(value) {
    let obj = this.scheduleType.find(object => object.name === value)
    this.selected_schedule_type = obj.index
  }

  /**
   * getSelectedDay
   */
  public getSelectedDay(index) {
    console.log(index);
    let selected_day = this.days[index - 1]
    return selected_day
  }

  /**
   * Get schedule 
   * @param id to get schedule 
   */
  public getSchedule(id): void {
    let schedule_day;
    this.schedulesService.getSchedule(id).
      subscribe(
      data => {
        if (data.type == 'TIMED') {
          this.selected_schedule_type = 2;
          schedule_day = this.getSelectedDay(data.day)
        } else {
          this.selected_schedule_type = 1;
        }

        this.form.patchValue({
          name: data.name,
          repeat: this.pad(data.repeat),
          exclusive: data.exclusive,
          process_name: data.process_name,
          type: data.type,
          day: schedule_day,
          time: data.time
        });
        console.log(this.form.value);
      },
      error => { console.log("error", error) })
  }

  /**
   * 
   * @param repeat_time interval to add left pad 
   */
  pad(repeat_time: string) {
    if (repeat_time != undefined) {
      console.log("time length", repeat_time.length)
      repeat_time = repeat_time.length == 7 ? repeat_time = "0" + repeat_time : repeat_time;
      console.log("time", repeat_time)
      return repeat_time;
    }
  }

  public toggleModal(isOpen: Boolean) {
    console.log("child data: " + this.childData)
    let schedule_name = <HTMLDivElement>document.getElementById("update-modal")
    if (isOpen) {
      schedule_name.classList.add('is-active')
      return
    }
    schedule_name.classList.remove('is-active')
  }

  public updateSchedule() {
    Object.keys(this.form.controls).forEach(key => {
      if (key == 'repeat' || key == 'time') {
        var time = this.form.get(key).value != ('None' || 'undefined') ? this.converTimeToSec(this.form.get(key).value) : 0
        console.log("Time", time);
        this.form.controls[key].setValue(time);
      }
      if (key == 'type') {
        this.setScheduleTypeKey(this.form.get(key).value)
        this.form.controls[key].setValue(this.selected_schedule_type);
      }

      if (key == 'day') {
        var index = this.form.get(key).value != 'undefined' ? this.days.indexOf(this.form.get(key).value) : 0
        if (index == -1) {
          delete this.form.controls[key];
          return;
        }
        this.form.controls[key].setValue(index + 1);
      }
    });
    console.log(this.form.value);
    this.schedulesService.updateSchedule(this.childData.id, this.form.value).
      subscribe(
      data => {
        this.notify.emit()
        this.toggleModal(false)
      },
      error => { console.log("error", error) })
  }

  // Convert time in seconds 
  converTimeToSec(timeValue) {
    var repeatTime = timeValue.split(':')
    var seconds = (+repeatTime[0]) * 60 * 60 + (+repeatTime[1]) * 60 + (+repeatTime[2])
    return seconds;
  }
}
