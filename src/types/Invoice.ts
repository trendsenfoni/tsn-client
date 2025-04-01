import { text } from 'stream/consumers'
import { Firm } from './Firm'
import { Item } from './Item'
import { Party } from './Party'

export interface Invoice {
  _id?: string
  firm?: Firm
  ioType?: number | 0 | 1
  profileId?: string | any | 'TEMELFATURA' | 'TICARIFATURA' | 'EARSIVFATURA' | 'IHRACAT' | 'YOLCUBERABERFATURA'
  invoiceTypeCode?: string | any | 'SAITS' | 'IADE' | 'TEVKIFAT' | 'ISTISNA' | 'OZELMATRAH' | 'IHRACKAYITLI'
  issueDate?: string
  issueTime?: string
  uuid?: string
  ID?: string
  lineCountNumberic?: number
  currency?: string | 'USD' | 'TRY' | 'EUR' | 'RUB' | 'GBP' | undefined
  note?: string[]
  accountingSupplierParty?: Party
  accountingCustomerParty?: Party
  taxTotal?: TaxTotal
  legalMonetaryTotal?: {
    lineExtensionAmount?: number
    taxExclusiveAmount?: number
    taxInclusiveAmount?: number
    allowanceTotalAmount?: number
    chargeTotalAmount?: number
    payableAmount?: number
  }
  draft?: boolean
}

export interface InvoiceLine {
  _id?: string
  invoice?: string
  ioType?: number
  issueDate?: string
  issueTime?: string
  ID?: string
  note?: string
  item?: Item
  invoicedQuantity?: number
  unitCode?: string
  price?: number
  lineExtensionAmount?: number
  currency?: string | 'USD' | 'TRY' | 'EUR' | 'RUB' | 'GBP' | undefined
  taxTotal?: TaxTotal
}

export interface TaxTotal {
  currency?: string
  taxAmount?: number
  taxSubtotal?: TaxSubtotal[]
}

export interface TaxSubtotal {
  taxableAmount?: number
  taxAmount?: number
  percent?: number
  taxCategory?: {
    taxScheme?: {
      name?: string
      taxTypeCode?: string
    }
  }
}

export function invoiceTypeName(ioType: number, t: any) {
  if (ioType == 0) {
    return t('Outgoing Invoice')
  } else {
    return t('Incoming Invoice')
  }
}

export function getProfileIdList(t: any) {
  return [
    { _id: 'TEMELFATURA', text: t('TEMELFATURA') },
    { _id: 'TICARIFATURA', text: t('TICARIFATURA') },
    { _id: 'EARSIVFATURA', text: t('EARSIVFATURA') },
    { _id: 'IHRACAT', text: t('IHRACAT') },
    { _id: 'YOLCUBERABERFATURA', text: t('YOLCUBERABERFATURA') },
  ]
}

export function getInvoiceTypeCodeList(t: any) {
  return [
    { _id: 'SATIS', text: t('SATIS') },
    { _id: 'IADE', text: t('IADE') },
    { _id: 'TEVKIFAT', text: t('TEVKIFAT') },
    { _id: 'ISTISNA', text: t('ISTISNA') },
    { _id: 'OZELMATRAH', text: t('OZELMATRAH') },
    { _id: 'IHRACKAYITLI', text: t('IHRACKAYITLI') },
  ]
}