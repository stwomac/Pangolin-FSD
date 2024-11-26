import { Reports } from './reports'
import { ContextType } from './context-type'

export class Context {
  constructor(
    public contextId: number,
    public contextType: ContextType,
    public report: Reports,
    public orgClaim?: string,
    public firstName?: string,
    public lastName?: string,
    public streetAddress?: string,
    public city?: string,
    public zip?: string,
    public country?: string,
    public phone?: string,
  ) {}
}
