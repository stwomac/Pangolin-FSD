export class Type {
    constructor(type_id: number,
                type_name: string,
                reports: number[],
                contextTypes: number[]) {
        this.type_id = type_id;
        this.type_name = type_name;
        this.reports = reports;
        this.contextTypes = contextTypes;
    }

    type_id: number;
    type_name: string;
    reports: number[];
    contextTypes: number[];
}
