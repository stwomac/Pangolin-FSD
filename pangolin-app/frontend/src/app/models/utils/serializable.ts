export abstract class Serializable<T> {
  constructor(public id: number) {}
  public abstract toJson(): T
}

export interface Deserializable<T, C> {
  new (data: T, ...args: any[]): C
}
