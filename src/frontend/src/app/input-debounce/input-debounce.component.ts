import {Component, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'input-debounce',
    template: '<input class="input" type="text" min="0" [max]="max" [placeholder]="placeholder" name="limit" [(ngModel)]="inputValue">',
    styleUrls: ['./input-debounce.component.css']
})
export class InputDebounceComponent {
    @Input() placeholder: string;
    @Input() max: string;
    @Input() delay: number = 2000;
    @Output() value: EventEmitter<any> = new EventEmitter();

    public inputValue: string;

    constructor(private elementRef: ElementRef) {
        const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.inputValue)
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe(input => this.value.emit(input));
    }
}
