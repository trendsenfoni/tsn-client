
export interface Item {
  _id?: string
  itemGroup?: ItemGroup
  name?: string
  description?: string
  vatRate?: number
  withHoldingTaxRate?: number
  unit?: string
  passive?: boolean
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


