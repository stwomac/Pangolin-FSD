import { Reports } from "../reports/reports";
import { ContextType } from "../context_type/context-type";

export class Context {
    constructor (context_id: number,
                context_type: ContextType,
                org_claim: string = '',
                first_name: string = '',
                last_name: string = '',
                street_address: string = '',
                city: string = '',
                zip: string = '',
                country: string = '',
                phone: string = '',
                report: Reports
    ) {
        this.context_id = context_id;
        this.context_type = context_type;
        this.org_claim = org_claim;
        this.first_name = first_name;
        this.last_name = last_name;
        this.street_address = street_address;
        this.city = city;
        this.zip = zip;
        this.country = country;
        this.phone = phone;
        this.report = report;
    }
    context_id: number;
    context_type: ContextType;
    org_claim: string;
    first_name: string;
    last_name: string;
    street_address: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
    report: Reports;
}
