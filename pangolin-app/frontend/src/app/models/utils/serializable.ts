export abstract class Serializable<DataType, IdKey extends keyof DataType> {
  protected constructor(public idPropKey: IdKey) {}
  public abstract toJson(): Omit<DataType, IdKey>
}

export interface Deserializable<Model, DataType, IdKey extends keyof DataType> {
  create(data: Omit<DataType, IdKey>): Model
}

export function Deserializable<
  Model,
  DataType,
  IdKey extends keyof DataType,
>() {
  return <U extends DeserializableType<Model, DataType, IdKey>>(
    constructor: U,
  ) => constructor
}

export interface DeserializableType<
  Model,
  DataType,
  IdKey extends keyof DataType,
> {
  new (data: OptionalId<DataType, IdKey>): Model
  parse(data: DataType): Model
}

export type OptionalId<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
