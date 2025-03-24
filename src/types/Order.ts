import { AddressField } from './AddressField'
import { Firm } from './Firm'
import { Item } from './Item'

export interface Order {
  _id?: string
  firm?: Firm
  draft?: boolean
  ioType?: number | 0 | 1
  issueDate?: string
  documentNumber?: string
  firmDocumentNumber?: string
  lineCount?: number
  quantity?: number
  total?: number
  currency?: string | 'USD' | 'TRY' | 'EUR' | 'RUB' | 'GBP' | undefined
  taxAmount?: number
  withHoldingTaxAmount?: number
  taxInclusiveTotal?: number
  note?: string
  address?: AddressField
  closed?: boolean
}

export interface OrderLine {
  _id?: string
  order?: string
  ioType?: number | 0 | 1
  issueDate?: string
  item?: Item
  description?: string
  quantity?: number
  delivered?: number
  remainder?: number
  price?: number
  total?: number
  currency?: string | 'USD' | 'TRY' | 'EUR' | 'RUB' | 'GBP' | undefined
  taxAmount?: number
  withHoldingTaxAmount?: number
  taxInclusiveTotal?: number
  closed?: boolean
}

export const OrderTypeList = [
  { _id: '0', text: 'Sales' },
  { _id: '1', text: 'Purchase' }
]