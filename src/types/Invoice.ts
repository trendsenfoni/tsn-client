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
  calculationSequenceNumeric?: number
  taxCategory?: {
    taxExemptionReasonCode?: string
    taxExemptionReason?: string
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
    { _id: 'TEMELFATURA', name: t('TEMELFATURA') },
    { _id: 'TICARIFATURA', name: t('TICARIFATURA') },
    { _id: 'EARSIVFATURA', name: t('EARSIVFATURA') },
    { _id: 'IHRACAT', name: t('IHRACAT') },
    { _id: 'YOLCUBERABERFATURA', name: t('YOLCUBERABERFATURA') },
  ]
}

export function getInvoiceTypeCodeList(t: any) {
  return [
    { _id: 'SATIS', name: t('SATIS') },
    { _id: 'IADE', name: t('IADE') },
    { _id: 'TEVKIFAT', name: t('TEVKIFAT') },
    { _id: 'ISTISNA', name: t('ISTISNA') },
    { _id: 'OZELMATRAH', name: t('OZELMATRAH') },
    { _id: 'IHRACKAYITLI', name: t('IHRACKAYITLI') },
  ]
}

export function showWithholdingTax(val?: number) {
  if (val != undefined && val > 0) {
    if (val > 1) val = val / 100
    switch (val) {
      case 0.1: return '1/10'
      case 0.2: return '2/10'
      case 0.3: return '3/10'
      case 0.4: return '4/10'
      case 0.5: return '5/10'
      case 0.6: return '6/10'
      case 0.7: return '7/10'
      case 0.8: return '8/10'
      case 0.9: return '9/10'
      case 1: return '10/10'
      default: return 'Unknown Rate'
    }
  } else {
    return ''
  }
}

export const withholdingTaxRateList = [
  { _id: '0', name: '0/10' },
  { _id: '0.1', name: '1/10' },
  { _id: '0.2', name: '2/10' },
  { _id: '0.3', name: '3/10' },
  { _id: '0.4', name: '4/10' },
  { _id: '0.5', name: '5/10' },
  { _id: '0.6', name: '6/10' },
  { _id: '0.7', name: '7/10' },
  { _id: '0.8', name: '8/10' },
  { _id: '0.9', name: '9/10' },
  { _id: '0.10', name: '10/10' },
]