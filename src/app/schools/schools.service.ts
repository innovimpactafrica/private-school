import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface DayConfig {
    day: string;
    open: boolean;
    openTime: string;
    closeTime: string;
}

export interface SchoolItem {
    id: number;
    name: string;
    address: string;
    created: string; // dd/mm/yyyy
    status: 'Actif' | 'Inactif';
    schedule: DayConfig[];
    logoUrl?: string;
}

type NewSchoolInput = {
    name: string;
    address: string;
    created: string;
    status: 'Actif' | 'Inactif';
    schedule?: DayConfig[];
};

@Injectable({ providedIn: 'root' })
export class SchoolsService {
    private readonly _schools$ = new BehaviorSubject<SchoolItem[]>([
        {
            id: 1,
            name: 'Collège de Dakar',
            address: 'Dakar, rue 21',
            created: '05/10/2025',
            status: 'Actif',
            schedule: this.defaultSchedule(),
        },
        {
            id: 2,
            name: 'Lycée el amine',
            address: 'Parcelles, unité 12',
            created: '05/10/2025',
            status: 'Inactif',
            schedule: [
                { day: 'Lundi', open: true, openTime: '08:00', closeTime: '18:00' },
                { day: 'Mardi', open: true, openTime: '08:00', closeTime: '18:00' },
                { day: 'Mercredi', open: true, openTime: '08:00', closeTime: '12:00' },
                { day: 'Jeudi', open: true, openTime: '08:00', closeTime: '17:00' },
                { day: 'Vendredi', open: true, openTime: '08:00', closeTime: '13:00' },
                { day: 'Samedi', open: true, openTime: '08:00', closeTime: '13:00' },
                { day: 'Dimanche', open: false, openTime: '00:00', closeTime: '00:00' },
            ],
        },
    ]);

    get schools$(): Observable<SchoolItem[]> {
        return this._schools$.asObservable();
    }

    private nextId(): number {
        const curr = this._schools$.getValue();
        return (curr.reduce((max, s) => Math.max(max, s.id), 0) || 0) + 1;
    }

    private defaultSchedule(): DayConfig[] {
        return [
            { day: 'Lundi', open: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'Mardi', open: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'Mercredi', open: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'Jeudi', open: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'Vendredi', open: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'Samedi', open: true, openTime: '08:00', closeTime: '18:00' },
            { day: 'Dimanche', open: false, openTime: '00:00', closeTime: '00:00' },
        ];
    }

    addSchool(input: NewSchoolInput) {
        const curr = this._schools$.getValue();
        const newItem: SchoolItem = {
            id: this.nextId(),
            name: input.name,
            address: input.address,
            created: input.created,
            status: input.status,
            schedule: input.schedule && input.schedule.length ? input.schedule : this.defaultSchedule(),
            logoUrl: undefined,
        };
        this._schools$.next([newItem, ...curr]);
    }

    getById(id: number): SchoolItem | undefined {
        return this._schools$.getValue().find(s => s.id === id);
    }

    getById$(id: number): Observable<SchoolItem | undefined> {
        return this.schools$.pipe(map(list => list.find(s => s.id === id)));
    }

    updateSchool(updated: SchoolItem) {
        const curr = this._schools$.getValue();
        const idx = curr.findIndex(s => s.id === updated.id);
        if (idx !== -1) {
            const next = curr.slice();
            next[idx] = { ...updated };
            this._schools$.next(next);
        }
    }
}
