export enum ReportType {
  IMPERSONATOR = 'IMPERSONATOR',
  JOB_OPPORTUNITY = 'JOB_OPPORTUNITY',
  SERVICE_SCAM = 'SERVICE_SCAM',
  HEALTH_SCAM = 'HEALTH_SCAM',
  ANNOYING_CALL = 'ANNOYING_CALL',
  ONLINE_SHOPPING = 'ONLINE_SHOPPING',
  SWEEPSTAKES = 'SWEEPSTAKES',
  AUTO_SALE = 'AUTO_SALE',
  CREDIT_SCAM = 'CREDIT_SCAM',
  OTHER = 'OTHER',
}

export class ContextType {
  constructor(
    public contextTypeId: number,
    public contextName: string,
    public type: ReportType,
  ) {}
}
