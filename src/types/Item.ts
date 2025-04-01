
export interface Item {
  _id?: string
  itemGroup?: ItemGroup
  name?: string
  description?: string
  keyword?: string
  brand?: Brand
  modelName?: string
  buyersItemIdentification?: string
  sellersItemIdentification?: string
  manufacturersItemIdentification?: string
  vatRate?: number
  withHoldingTaxRate?: number
  unit?: string
  additionalItemIdentification?: string[]
  passive?: boolean
}

export interface Brand {
  _id?: string
  name?: string
  logo?: string
  article?: string
}



export interface ItemMainGroup {
  _id?: string
  name?: string
  article?: string
}

export interface ItemGroup {
  _id?: string
  itemMainGroup?: ItemMainGroup
  name?: string
  article?: string

}


