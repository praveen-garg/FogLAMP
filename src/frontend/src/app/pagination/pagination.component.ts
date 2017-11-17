import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { AssetsComponent } from '../assets/index';

@Component({
    selector: 'my-pagination',
    templateUrl: 'pagination.component.html'
})

export class PaginationComponent  {
    @Input() page: number; // the current page
    @Input() count: number; // how many total items there are in all pages
    @Input() perPage: number; // how many items we want to show per page
    @Input() pagesToShow: number; // how many pages between next/prev

    @Output() goPrev = new EventEmitter<boolean>();
    @Output() goNext = new EventEmitter<boolean>();
    @Output() goPage = new EventEmitter<number>();
    @Output() goFirst = new EventEmitter<boolean>();
    @Output() goLast = new EventEmitter<number>();

    middlePg : any;
    totalPg : any;

    constructor(private cdRef:ChangeDetectorRef) {}

    ngAfterViewChecked()
    {
        this.cdRef.detectChanges();
    }

    ngOnInit() {
        this.middlePg = this.middlePage();
        this.totalPg = this.totalPages();
    }

    onPage(n: number): void {
        this.goPage.emit(n);
    }

    onPrev(): void {
        this.goPrev.emit(true);
    }

    onNext(): void {
        this.goNext.emit(true);
    }

    onFirst(): void {
        this.goFirst.emit(true);
    }

    onLast(): void {
        const n = this.totalPages();
        this.goLast.emit(n);
    }

    public totalPages(): number {
        console.log('count22', this.count);
        console.log('perPage22', this.perPage);
        const n = Math.ceil(this.count / this.perPage) || 0;
        this.totalPg = n;
        console.log('totalPages2', this.totalPg);
        return n;
    }

    lastPage(): boolean {
        return this.perPage * this.page >= this.count;
    }

    middlePage(): number {
        const n = this.totalPages();
        const p = Math.ceil(n/2);
        this.middlePg = p;
        return p;
    }
}
