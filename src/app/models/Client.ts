export class Client {
    constructor(
        public NCIN?: number,
        public numeroPermis?: number,
        public nom?: string,
        public prenom?: string,
        public dateDeNaissance?: Date,
        public adresse?: string,
    ) { }
}