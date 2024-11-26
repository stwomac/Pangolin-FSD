import { Context } from '../context/context'
import { Type } from '../type/type'

export class ContextType {
  constructor(
    context_type_id: number,
    context_name: string,
    contexts: Context[],
    type: Type,
  ) {
    this.context_type_id = context_type_id
    this.context_name = context_name
    this.contexts = contexts
    this.type = type
  }
  context_type_id: number
  context_name: string
  contexts: Context[]
  type: Type
}
