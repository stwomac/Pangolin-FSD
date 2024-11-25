import { Reports } from '../reports/reports'
import { ContextType } from '../context_type/context-type'

export class Context {
  constructor(
    public context_id: number,
    public context_type: ContextType,
    public org_claim: string = '',
    public first_name: string = '',
    public last_name: string = '',
    public street_address: string = '',
    public city: string = '',
    public zip: string = '',
    public country: string = '',
    public phone: string = '',
    public report: Reports,
  ) {}
}
