import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-time-picker',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
    @Input() value: string = '00:00'; // HH:mm
    @Input() minuteStep: number = 1;
    @Input() format: '24h' | '12h' = '24h';
    @Input() disabled: boolean = false;
    @Output() valueChange = new EventEmitter<string>();

    open = false;

    hours: string[] = [];
    minutes: string[] = [];

    @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;
    @ViewChild('panelEl') panelEl!: ElementRef<HTMLDivElement>;

    ngOnInit() {
        this.buildOptions();
    }

    ngOnChanges() {
        this.buildOptions();
    }

    private buildOptions() {
        const pad = (n: number) => n.toString().padStart(2, '0');
        this.hours = Array.from({ length: this.format === '24h' ? 24 : 12 }, (_, i) => pad(this.format === '24h' ? i : (i === 0 ? 12 : i)));
        const step = Math.max(1, this.minuteStep);
        this.minutes = Array.from({ length: Math.ceil(60 / step) }, (_, i) => pad(i * step)).slice(0, 60);
    }

    toggleOpen(evt?: Event) {
        if (this.disabled) return;
        if (evt) evt.stopPropagation();
        this.open = !this.open;
        if (this.open) {
            setTimeout(() => this.scrollToCurrent(), 0);
        }
    }

    @HostListener('document:click', ['$event'])
    onDocClick(event: MouseEvent) {
        if (!this.open) return;
        const target = event.target as Node;
        if (this.panelEl && this.panelEl.nativeElement.contains(target)) return;
        if (this.inputEl && this.inputEl.nativeElement.contains(target)) return;
        this.open = false;
    }

    @HostListener('document:keydown.escape')
    onEsc() {
        this.open = false;
    }

    onPickHour(h: string) {
        const [_, m] = this.value.split(':');
        this.setValue(`${h}:${m ?? '00'}`);
    }

    onPickMinute(min: string) {
        const [h] = this.value.split(':');
        this.setValue(`${h ?? '00'}:${min}`);
    }

    private setValue(v: string) {
        this.value = v;
        this.valueChange.emit(v);
    }

    private scrollToCurrent() {
        const [hStr, mStr] = (this.value || '00:00').split(':');
        const hourIdx = this.hours.findIndex(h => h === hStr.padStart(2, '0'));
        const minIdx = this.minutes.findIndex(m => m === mStr.padStart(2, '0'));
        const hourCol = this.panelEl?.nativeElement.querySelector('[data-col="hours"]');
        const minCol = this.panelEl?.nativeElement.querySelector('[data-col="minutes"]');
        const rowH = 36; // estimated item height
        if (hourCol && hourIdx >= 0) (hourCol as HTMLElement).scrollTop = Math.max(0, hourIdx * rowH - rowH * 2);
        if (minCol && minIdx >= 0) (minCol as HTMLElement).scrollTop = Math.max(0, minIdx * rowH - rowH * 2);
    }

    get selectedHour(): string {
        return (this.value || '00:00').split(':')[0]?.padStart(2, '0');
    }
    get selectedMinute(): string {
        return (this.value || '00:00').split(':')[1]?.padStart(2, '0');
    }

    onHoursScroll(event: Event) {
        const el = event.target as HTMLElement;
        const rowH = 36;
        const idx = Math.round(el.scrollTop / rowH);
        const clamped = Math.min(this.hours.length - 1, Math.max(0, idx));
        const h = this.hours[clamped];
        if (h && h !== this.selectedHour) {
            this.onPickHour(h);
        }
    }

    onMinutesScroll(event: Event) {
        const el = event.target as HTMLElement;
        const rowH = 36;
        const idx = Math.round(el.scrollTop / rowH);
        const clamped = Math.min(this.minutes.length - 1, Math.max(0, idx));
        const m = this.minutes[clamped];
        if (m && m !== this.selectedMinute) {
            this.onPickMinute(m);
        }
    }
}
