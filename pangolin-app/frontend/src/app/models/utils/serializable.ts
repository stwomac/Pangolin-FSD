export function Deserializable<Model, DataType, ApiDataModel>() {
  return <U extends Deserializable<Model, DataType, ApiDataModel>>(
    constructor: U,
  ) => constructor
}

export interface Deserializable<Model, DataType, ApiDataModel> {
  new (data: DataType | ApiDataModel): Model
}
