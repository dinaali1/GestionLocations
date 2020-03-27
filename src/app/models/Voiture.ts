export class Voiture {
    constructor(
        public numeroChassis?: string,
        public numeroImmat?: string,
        public marque?: string,
        public modele?: string,
        public dateCirculation?: Date,
        public puissance?: string,
        public nombreCylindre?: string,
        public prixLocation?: number,
        public assurance?: Assurance
    ) { }
}

export class Assurance {
    constructor(
        public assureur?: string,
        public typeAss?: string,
        public cotisation?: string
    ) {}
}