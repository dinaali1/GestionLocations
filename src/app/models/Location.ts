import { Voiture } from './Voiture';
import { Client } from './Client';
export class Location {
    constructor(
        public NCIN?: number,
        public numeroChassis?: string,
        public client?: Client,
        public voiture?: Voiture,
        public promotion?: number,
        public montant?: number,
        public dateDebut?: Date,
        public nbJoursLocation?: Date,
        public accident?: Accident
    ) { }
}

export class Accident {
    constructor(
        public Description?: string,
        public lieu?: string,
        public date?: Date,
    ) { }
}