import { AddressField } from './AddressField'
import { FirmType } from './FirmType'
import { InventoryType } from './InventoryType'

export interface DespatchType {
  _id?: string
  firm?: FirmType
  ioType?: number | 0 | 1
  issueDate?: string
  issueTime?: string
  documentNumber?: string
  lineCount?: number
  quantity?: number
  total?: number
  currency?: string | 'USD' | 'TRY' | 'EUR' | 'RUB' | 'GBP' | undefined
  taxAmount?: number
  withHoldingTaxAmount?: number
  taxInclusiveTotal?: number
  note?: string
  address?: AddressField
  driver?: {
    firstName?: string
    lastName?: string
    idCardNo?: string
  },
  vechiclePlate?: string,
  lines?: InventoryType[]
}

