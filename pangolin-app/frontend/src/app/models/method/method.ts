import { Reports } from "../reports/reports";

export class Method {
    constructor(method_id: number,
                method_name: string,
                reports: Reports[]
    ) {
        this.method_id = method_id;
        this.method_name = method_name;
        this.reports = reports;
    }
    method_id: number;
    method_name: string;
    reports: Reports[];
}
